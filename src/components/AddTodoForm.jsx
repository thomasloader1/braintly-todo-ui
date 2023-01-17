import React, { useState, useRef, useContext } from "react";
import moment from "moment";
import axios from "axios";
import { AppContext } from "../Provider/StateProvider";
const AddTodoForm = ({ priorities }) => {
  const { setEventOnTask } = useContext(AppContext);
  const [priority, setPriority] = useState({ id: false, name: false });
  const [taskTitle, setTaskTitle] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [taskDate, setTaskDate] = useState(false);
  const [taskTime, setTaskTime] = useState(false);
  const formAddNewTaskRef = useRef(null);

  const formReadyToSubmit = !(
    taskDate &&
    taskTime &&
    taskTitle &&
    priority?.id
  );

  const handleSubmitTask = async (evt) => {
    evt.preventDefault();
    setFetching(true);
    const formData = new FormData(formAddNewTaskRef.current);
    console.log(formData);

    const dueDate = moment(
      `${formData.get("date")} ${formData.get("time")}`
    ).format("YYYY-MM-DD hh:mm:ss");

    formData.delete("date");
    formData.delete("time");
    formData.append("due_date", dueDate);
    formData.append("is_completed", 0);

    axios
      .post("http://localhost:8000/api/tasks", {
        title: formData.get("task_title"),
        priority_id: formData.get("priority_id"),
        due_date: dueDate,
        is_completed: 0,
      })
      .then((data) => {
        setEventOnTask("add");
        console.log({ data });
      })
      .catch((err) => console.error({ err }))
      .finally(() => setFetching(false));

    formAddNewTaskRef.current.reset();
  };

  const handleTaskTitle = (evt) => {
    const { value } = evt.target;
    setTaskTitle(value);
  };

  const handleClickPriority = (evt) => {
    const { value } = evt.target;
    const [priority] = priorities.filter(
      (priority) => priority.id === Number(value)
    );

    setPriority({
      ...priority,
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
        <select
          className="form-select btn btn-secondary "
          name="priority_id"
          onChange={handleClickPriority}
        >
          <option selected>Prioridad</option>
          {priorities.map((priority) => (
            <option key={priority.id} value={priority.id}>
              {priority.name}
            </option>
          ))}
        </select>
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
          disabled={formReadyToSubmit || fetching}
        >
          {fetching ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Procesando</span>
            </>
          ) : (
            "Agregar"
          )}
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
