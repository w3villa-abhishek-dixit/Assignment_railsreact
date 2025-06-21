import { useState, useEffect } from "react";

export default function StudentForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    id: null,
  });

  // ✅ Update formData when editing a new student
  useEffect(() => {
    if (initialData.id) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", email: "", course: "", id: null }); // Reset
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold mb-4 text-center">
        {formData.id ? "Update Student" : "Add Student"}
      </h2>
      {["name", "email", "course"].map((field) => (
        <div key={field} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">
            {field}
          </label>
          <input
            name={field}
            value={formData[field] || ""}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder={`Enter ${field}`}
          />
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        {formData.id ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}
