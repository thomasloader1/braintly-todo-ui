import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Provider/StateProvider";
import FormControls from "./FormControls";
import Task from "./Task";

const TaskList = () => {
  const { tasks } = useContext(AppContext);
  const [tasksStore, setTasksStore] = useState([]);
  const [selectTask, setSelectTask] = useState(null);

  useEffect(() => {
    setTasksStore(tasks);
  }, []);

  const handleOrderByDueDate = (evt) => {
    const tasksOrdered = tasksStore.sort((a, b) => {
      return new Date(b.due_date) - new Date(a.due_date);
    });

    setTasksStore(tasksOrdered);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between mb-3">
        <h3>Tareas:</h3>
        <button
          className="btn btn-secondary btn-sm"
          onClick={handleOrderByDueDate}
        >
          Ordenar por deadline
        </button>
      </div>

      {selectTask && <FormControls />}

      <ul className="list-group">
        {tasksStore.map((task) => (
          <Task key={task.id} task={task} setSelectTask={setSelectTask} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
