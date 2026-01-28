import { useEffect, useState } from "react";
import "./DailyPlanner.css";

const DailyPlanner = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("dailyTasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Failed to load tasks:", error);
      localStorage.removeItem("dailyTasks"); // Clear corrupted data
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem("dailyTasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  }, [tasks]);

  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const handleDelete = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
    // console.log("deleted",id);
  };

  const handleSubmit = (e) => {
    if (tasks.length >= 6) {
      alert("Daily limit reached! Complete or delete tasks first. 💪");
      return;
    }

    e?.preventDefault(); // Handle both button click & form submit
    if (!task.trim()) return;

    const newTask = {
      id: Date.now(),
      text: task.trim(),
    };

    setTasks((prev) => [...prev, newTask]);
    setTask("");
  };

  return (
    <div className="contain">
      <div className="planner-container">
        <div className="planner-form">
          <h3>Daily Planner</h3>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Add a task..."
              value={task}
              onChange={handleChange}
              autoFocus
            />
            <button type="submit">Add</button>
          </form>
        </div>

        <div className="display-box">
          <h4>Your Tasks</h4>
          {tasks.length === 0 ? (
            <p style={{ opacity: 0.7 }}>No tasks yet. Add one above! ✨</p>
          ) : (
            <ol className="ul">
              {tasks.map((item) => (
                <li key={item.id} className="li">
                  {item.text}
                  <button
                    className="delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyPlanner;
