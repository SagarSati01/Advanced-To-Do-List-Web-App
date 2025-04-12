import { useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, fetchTodos }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  
  const filteredTodos = todos 
    .filter((todo) =>
      selectedCategory ? todo.category === selectedCategory : true
    )
    .filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((todo)=>(showCompleted? true : !todo.completed ));

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full md:w-1/2 focus:outline-none"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full md:w-1/3 bg-white"
        >
          <option value="">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
          <option value="General">General</option>
        </select>
      </div>

      <div className="flex items-center gap-2 mb-4">
      <input
          type="checkbox"
          checked={showCompleted}
          onChange={() => setShowCompleted(!showCompleted)}
          className="accent-green-500 cursor-pointer  w-4 h-4"
        />
        <span className="text-gray-700 text-sm">Show Completed</span>
      </div>

      {filteredTodos.length === 0 ? (
        <p className="text-center text-gray-400">
          No tasks match your filters.
        </p>
      ) : (
        <ul className="space-y-2">
          {filteredTodos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} fetchTodos={fetchTodos} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
