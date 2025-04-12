import React, { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "./utils/config";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState([]);
  // const [filter, setFilter] = useState("All");

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_URL}/todos`);
      setTodos(res.data);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center px-2">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-4 sm:p-6 min-h-screen sm:min-h-[90vh] flex flex-col">
        <Header />
        <div className="my-4">
          <TodoForm fetchTodos={fetchTodos} />
        </div>
        <TodoList todos={todos} fetchTodos={fetchTodos} />
      </div>
    </div>
  );
};

export default App;
