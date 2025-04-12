import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/config";

const TodoItem = ({ todo, fetchTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const toggleComplete = async () => {
    try {
      const updatedTodo={text:todo.text,completed:!todo.completed};
      await axios.put(`${API_URL}/todos/${todo._id}`, updatedTodo);

      fetchTodos();
    } catch (error) {
      console.log("Error toggling todo:", error);
    }
  };

  const editTodo = async () => {
    if (editText.trim()) {
      try {
        await axios.put(`${API_URL}/todos/${todo._id}`, {
          text: editText,
          completed: todo.completed, // preserve completed status
        });

        setIsEditing(false);
        fetchTodos();
      } catch (error) {
        console.log("Error editing todo:", error);
      }
    }
  };

  const deleteTodo = async () => {
    try {
      await axios.delete(`${API_URL}/todos/${todo._id}`);
      fetchTodos();
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

  return (
    <li className="flex justify-between items-center bg-white p-3 rounded shadow transition-all">
      <div className="flex-1 flex items-center gap-2">
        <input type="checkbox"
          checked={todo.completed}
          onChange={toggleComplete}
          className="accent-green-500 cursor-pointer"
        />
        {isEditing ? (
          <input type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && editTodo()}
            className="flex-1 border-b border-gray-300 mr-3 px-1"
          />
        ) : (
          <span className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-gray-400" : ""}`}>
             {todo.text}
          </span>
        )}

      </div>

      {isEditing ? (
        <button
          onClick={editTodo}
          className="text-green-500 hover:text-green-700"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="text-blue-500 hover:text-blue-700"
        >
          Edit
        </button>
      )}

      <button
        onClick={deleteTodo}
        className="text-red-500 hover:text-red-700 ml-4"
      >
        ✕
      </button>
    </li>
  );
};

export default TodoItem;
