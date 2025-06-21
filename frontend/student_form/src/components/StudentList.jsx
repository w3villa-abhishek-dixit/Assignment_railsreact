import { useEffect, useState } from "react";
import { api } from "../api";
import StudentForm from "./StudentForm";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await api.get("/students");
    setStudents(res.data);
  };

  const handleCreate = async (student) => {
    await api.post("/students", { student });
    fetchStudents();
  };

  const handleUpdate = async (student) => {
    await api.put(`/students/${student.id}`, { student });
    setEditingStudent(null);
    fetchStudents();
  };

  const handleDelete = async (id) => {
    await api.delete(`/students/${id}`);
    fetchStudents();
  };

  return (
    <div className="container mx-auto p-4">
      <StudentForm
        onSubmit={editingStudent ? handleUpdate : handleCreate}
        initialData={editingStudent || {}}
      />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Student List</h2>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Course</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu) => (
              <tr key={stu.id}>
                <td className="border px-4 py-2">{stu.name}</td>
                <td className="border px-4 py-2">{stu.email}</td>
                <td className="border px-4 py-2">{stu.course}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => setEditingStudent(stu)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(stu.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
