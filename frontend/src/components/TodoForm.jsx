import React from "react";

import axios from "axios";
import { API_URL } from "../utils/config";
import { useState } from "react";

const TodoForm = ({ fetchTodos }) => {
  const [text, setText] = useState("");
  const [completed, setCompleted] = useState(false);
  const [category, setCategory] = useState("Work");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("please enter some text ");
      return;
    }
    try {
      await axios.post(`${API_URL}/todos`, { text, completed, category });
      setText("");
      setCategory("Work");
      fetchTodos();
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-3 mb-6 bg-white p-4 rounded-xl shadow-md"
    >
      <input
        type="text"
        placeholder="Enter a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full sm:flex-[2] border border-gray-300 px-3 py-2 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-24 sm:w-28 md:w-32 border border-gray-300 px-2 py-1.5 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Study">Study</option>
        <option value="General">General</option>
      </select>

      <button
        type="submit"
        className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow transition"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
