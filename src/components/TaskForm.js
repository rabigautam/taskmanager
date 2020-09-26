import React, { useContext, useState, useEffect } from "react";
import { TaskListContext } from "../context/TaskListContext";
const TaskForm = () => {
  const { addTask, deleteAllTasks, editItem, editTask } = useContext(
    TaskListContext
  );
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      editTask(editItem.id, title);
    } else {
      addTask(title);
      setTitle(" ");
    }
  };

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title);
    } else {
      setTitle("");
    }
  }, [editItem]);

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        onChange={handleChange}
        value={title}
        type="text"
        className="task-input"
        placeholder="Add Task.."
        required
      />
      <div className="button">
        <button type="submit" className="btn add-task-btn">
          {editItem ? "Edit task" : "Add Task"}
        </button>
        <button onClick={deleteAllTasks} className="btn clear-btn">
          Clear
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
