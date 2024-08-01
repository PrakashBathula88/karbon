import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/TasksSlice";
const FloatingBox = () => {
    const dispatch = useDispatch();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newTask, setNewTask] = useState([]);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      dispatch(
        addTask({
          columnId: "todo",
          title: newTask.title,
          description: newTask.description,
        })
      );
      setNewTask({ title: "", description: "" });
      setIsFormVisible(false);
    }
  };

  return (
    <div className="float">
      <button
        className="floating-button"
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        +
      </button>

      <form
        className={`task-form ${isFormVisible ? "active" : ""}`}
        onSubmit={handleFormSubmit}
      >
        <h3>Create New Task</h3>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        ></textarea>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default FloatingBox;
