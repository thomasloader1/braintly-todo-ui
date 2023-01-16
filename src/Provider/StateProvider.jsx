import React, { createContext, useState } from "react";
import { useFetch } from "../hooks/useFetch";

function StateProvider({ children }) {
  const {
    data: tasks,
    error: errorTasks,
    loading: loadingTasks,
  } = useFetch("http://localhost:8000/api/tasks");
  const {
    data: priorities,
    error: errorPriorities,
    loading: loadingPriorities,
  } = useFetch("http://localhost:8000/api/priorities");

  return (
    <AppContext.Provider
      value={{
        priorities,
        errorPriorities,
        loadingPriorities,
        tasks,
        errorTasks,
        loadingTasks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default StateProvider;
export const AppContext = createContext();
