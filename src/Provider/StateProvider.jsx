import React, { createContext, useState } from "react";
import { useFetch } from "../hooks/useFetch";

function StateProvider({ children }) {
  const [eventOnTask, setEventOnTask] = useState(null);

  const {
    data: tasks,
    error: errorTasks,
    loading: loadingTasks,
  } = useFetch("http://localhost:8000/api/tasks", eventOnTask);

  const {
    data: priorities,
    error: errorPriorities,
    loading: loadingPriorities,
  } = useFetch("http://localhost:8000/api/priorities");

  const [selectTask, setSelectTask] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  return (
    <AppContext.Provider
      value={{
        priorities,
        errorPriorities,
        loadingPriorities,
        tasks,
        errorTasks,
        loadingTasks,
        selectTask,
        setSelectTask,
        eventOnTask,
        setEventOnTask,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default StateProvider;
export const AppContext = createContext();
