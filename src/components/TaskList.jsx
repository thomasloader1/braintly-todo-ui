import React, { useContext } from "react";
import { AppContext } from "../Provider/StateProvider";

const STATUS_CLASS = {
  baja: "bg-primary",
  media: "bg-warning",
  alta: "bg-danger",
  default: "bg-secondary",
};

const TaskList = () => {
  const { tasks, errorTasks, priorities } = useContext(AppContext);

  const determinateBackgroundByPriorityName = (priorityName) => {
    switch (priorityName) {
      case "baja":
        return STATUS_CLASS.baja;
      case "media":
        return STATUS_CLASS.media;
      case "alta":
        return STATUS_CLASS.alta;
      default:
        return STATUS_CLASS.default;
    }
  };

  return (
    <div className="container">
      <h3>Tareas:</h3>
      <ul className="list-group">
        {tasks.map((task) => {
          const priorityNameLowerCase = task.priority_name.toLowerCase();
          const priorityClass = determinateBackgroundByPriorityName(
            priorityNameLowerCase
          );

          return (
            <li
              key={task.id}
              class="list-group-item list-group-item-dark d-flex justify-content-between align-items-center"
            >
              {task.title}
              <span className={`badge ${priorityClass} rounded-pill`}>
                {task.priority_name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TaskList;
