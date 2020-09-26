import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const TaskListContext = createContext();

const TaskListContextProvider = (props) => {
  const initialState = JSON.parse(localStorage.getItem("tasks"));
  const [tasks, setTasks] = useState(initialState);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  
  const addTask = (title) => {
    setTasks([...tasks, { title, id: uuidv4() }]);
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter((x) => x.id !== id));
  };
  const editTask = (id, title) => {
    const updateData = tasks.map((task) =>
      task.id === id ? { id, title } : task
    );
    setTasks(updateData);
    setEditItem(null)
  };
  const findItem = (id) => {
    const item = tasks.find((x) => x.id === id);
    setEditItem(item);
  };
  const deleteAllTasks = () => {
    setTasks([]);
  };
  return (
    <TaskListContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        editItem,
        deleteTask,
        deleteAllTasks,
        findItem,
      }}
    >
      {props.children}
    </TaskListContext.Provider>
  );
};
export default TaskListContextProvider;
