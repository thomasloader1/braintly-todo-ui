import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
const AddTodoForm = ({ priorities }) => {
  const [priority, setPriority] = useState({ id: null, name: null });
  const [taskTitle, setTaskTitle] = useState(null);
  const [taskDate, setTaskDate] = useState(null);
  const [taskTime, setTaskTime] = useState(null);
  const formAddNewTaskRef = useRef(null);

  const formReadyToSubmit = !(
    taskDate &&
    taskTime &&
    taskTitle &&
    priority?.id
  );

  const handleSubmitTask = async (evt) => {
    evt.preventDefault();
    const formData = new FormData(formAddNewTaskRef.current);

    const dueDate = moment(
      `${formData.get("date")} ${formData.get("time")}`
    ).format("YYYY-MM-DD hh:mm:ss");

    formData.delete("date");
    formData.delete("time");
    formData.append("due_date", dueDate);
    formData.append("is_completed", 0);

    /*

    fetch("http://localhost:8000/api/tasks", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }); */
  };

  const handleTaskTitle = (evt) => {
    const { value } = evt.target;
    setTaskTitle(value);
  };

  const handleClickPriority = (evt, clickedPriority) => {
    const { id, name } = clickedPriority;
    setPriority({
      id,
      name,
    });
  };

  const handleTaskDateTime = (evt) => {
    const { value, id } = evt.target;

    if (id === "date") {
      setTaskDate(value);
      return;
    }

    setTaskTime(value);
  };

  return (
    <form
      ref={formAddNewTaskRef}
      className="card card-body bg-custom-grey mb-3"
      onSubmit={handleSubmitTask}
    >
      <div className="input-group mb-3">
        <input
          type="text"
          name="task_title"
          className="form-control"
          placeholder="Realizar deploy back-end"
          onChange={handleTaskTitle}
        />
        <input type="hidden" name="priority_id" value={priority.id} />
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {priority.id > 0 ? priority.name : "Prioridad"}
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          {priorities.map((priority) => (
            <li key={priority.id}>
              <a
                className="dropdown-item"
                href="#"
                onClick={(evt) => {
                  handleClickPriority(evt, priority);
                }}
              >
                {priority.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="input-group">
        <span className="input-group-text bg-secondary text-white">
          Realizar antes de
        </span>
        <input
          type="date"
          name="date"
          id="date"
          onChange={handleTaskDateTime}
          className="form-control"
        />
        <input
          type="time"
          name="time"
          id="time"
          onChange={handleTaskDateTime}
          className="form-control"
        />
      </div>
      <div className="mt-3 d-grid gap-2 d-md-block">
        <button
          className="btn btn-primary "
          type="submit"
          disabled={formReadyToSubmit}
        >
          Agregar
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
