import React, { useState, useEffect } from "react";
import initialTasks from "./tasks.json";

function useTasks() {
  const STORAGE_KEY = "todo_app_tasks_v2";
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return initialTasks.map((t, i) => ({ id: t.id ?? "seed-" + i, ...t }));
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  return [tasks, setTasks];
}

export default function App() {
  const [tasks, setTasks] = useTasks();
  const [text, setText] = useState("");

  function addTask(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setTasks(prev => [{ id: Date.now().toString(), text, completed: false }, ...prev]);
    setText("");
  }

  function toggleTask(id) {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200">
      <h1 className="text-3xl font-semibold text-center mb-6">To-Do List</h1>

      <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add a new task"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
          Add
        </button>
      </form>

      {tasks.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No tasks yet — start adding some!</div>
      ) : (
        <ul className="space-y-3">
          {tasks.map(task => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-3">
                <input
                  id={"cb-" + task.id}
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 accent-blue-500"
                />
                <label
                  htmlFor={"cb-" + task.id}
                  className={
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }
                >
                  {task.text}
                </label>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-400 transition"
                >
                  {task.completed ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-400 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
