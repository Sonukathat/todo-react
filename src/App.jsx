import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = () => {
    if (input.trim() === "") {
      alert("⚠️ Please enter a task first!");
      return;
    }

    if (editIndex !== null) {
      const updated = tasks.map((task, i) =>
        i === editIndex ? { ...task, text: input } : task
      );
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: input, completed: false }]);
    }
    setInput("");
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const handleEdit = (index) => {
    setInput(tasks[index].text);
    setEditIndex(index);
  };

  const handleToggle = (index) => {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      }}
    >
      <div className="bg-white/30 backdrop-blur-lg shadow-xl rounded-3xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6 drop-shadow-sm">
          ✨ My Stylish To-Do List
        </h1>

        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a task..."
            className="flex-1 border border-gray-300/50 bg-white/60 backdrop-blur-sm p-3 rounded-xl outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 placeholder-gray-400"
          />
          <button
            onClick={handleAdd}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white px-5 py-2 rounded-xl shadow-md font-medium transition-all"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white/50 backdrop-blur-md border border-white/40 rounded-2xl px-4 py-3 shadow hover:shadow-lg transition-all"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(index)}
                  className="w-5 h-5 accent-pink-500 cursor-pointer"
                />
                <span
                  className={`text-lg ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {task.text}
                </span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition-all"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}

          {tasks.length === 0 && (
            <p className="text-center text-gray-600 italic mt-4">
              No tasks yet — start adding some! 🚀
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
