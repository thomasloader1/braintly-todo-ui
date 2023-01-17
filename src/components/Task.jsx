import React from "react";
import moment from "moment/moment";
const STATUS_CLASS = {
  baja: "bg-primary",
  media: "bg-warning",
  alta: "bg-danger",
  default: "bg-secondary",
};

const Task = ({ task, setSelectTask }) => {
  const priorityNameLowerCase = task.priority_name.toLowerCase();

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

  const priorityClass = determinateBackgroundByPriorityName(
    priorityNameLowerCase
  );

  return (
    <li className="list-group-item list-group-item-dark d-flex justify-content-start align-items-center">
      <input
        className="form-check-input me-0"
        type="radio"
        name="task"
        value=""
        id={task.id}
        onClick={(evt) => {
          setSelectTask(task);
        }}
      />
      <label className="form-check-label me-auto ms-3" htmlFor={task.id}>
        {task.title}
      </label>
      <span
        className={`badge ${
          task.is_completed > 0 ? "bg-success" : priorityClass
        } rounded-pill ms-auto`}
      >
        {task.priority_name} | Deadline:{" "}
        {moment(task.due_date).format("DD/MM/YY HH:mm a")}{" "}
        {task.is_completed > 0 && " | Finalizada"}
      </span>
    </li>
  );
};

export default Task;
