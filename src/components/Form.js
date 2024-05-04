import React, { useState, useEffect } from "react"; // Importing useEffect and useState
import useFirestore from "../Hooks/useFirestore";
import { useAuth0 } from "@auth0/auth0-react";
import toast from "react-hot-toast";

const Form = ({ taskToEdit, onSubmit }) => {
  const { uploadTask } = useFirestore();
  const { user } = useAuth0();

  const [formData, setFormData] = useState({
    name: taskToEdit ? taskToEdit.name : "",
    date: taskToEdit ? taskToEdit.deadline.toDate().toISOString().substr(0, 10) : "",
    time: taskToEdit ? taskToEdit.deadline.toDate().toISOString().substr(11, 5) : "",
    tag: taskToEdit ? taskToEdit.tag.join(", ") : "",
    desc: taskToEdit ? taskToEdit.desc : "",
    link: taskToEdit ? taskToEdit.link : "",
  });

  // Update editedTask state when form data changes
  // useEffect(() => {
  //   setEditedTask({
  //     ...taskToEdit,
  //     ...formData,
  //     deadline: new Date(`${formData.date}T${formData.time}`),
  //     tag: formData.tag.split(",").map((tag) => tag.trim()),
  //   });
  // }, [formData, taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      deadline: new Date(`${formData.date}T${formData.time}`),
      tag: formData.tag.split(",").map((tag) => tag.trim()),
    };

    if (onSubmit) {
      onSubmit(formattedData);
      toast.success('Edited the Card!')
    } else {
      uploadTask(formattedData, user.nickname);
      toast.success('Added the Card!')
      setFormData(() => ({
        name:  "",
        date:  "",
        time:  "",
        tag:   "",
        desc:  "",
        link:  "",
      }))
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="mb-6 text-3xl font-semibold text-gray-800">
        {onSubmit ? "Edit Task" : "Add New Task"}
      </h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Work Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Link</label>
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
        {onSubmit ? "Edit" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default Form;
