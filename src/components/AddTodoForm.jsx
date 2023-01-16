import React, { useEffect, useState } from "react";

const AddTodoForm = ({ priorities }) => {
  const [priority, setPriority] = useState({ id: null, name: null });

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        name="task_title"
        className="form-control"
        placeholder="Hacerme alto guiso"
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
              onClick={() => {
                setPriority({
                  id: priority.id,
                  name: priority.name,
                });
              }}
            >
              {priority.name}
            </a>
          </li>
        ))}
      </ul>
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle=""
        onClick={() => {
          const formData = new FormData();
          fetch("", {
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }}
      >
        Agregar
      </button>
    </div>
  );
};

export default AddTodoForm;
