import React, { useState } from "react";
import ModalFrom from "./ModalFrom";

const FormControls = () => {
  const [action, setAction] = useState(null);

  return (
    <>
      <div className="btn-group d-flex my-3">
        <button
          className="btn btn-success w-100"
          type="button"
          id="complete"
          data-bs-toggle="modal"
          data-bs-target="#modalForm"
          onClick={() => {
            setAction("complete");
          }}
        >
          Finalizar
        </button>
        <button
          className="btn btn-primary w-100"
          type="button"
          id="edit"
          data-bs-toggle="modal"
          data-bs-target="#modalForm"
          onClick={() => {
            setAction("edit");
          }}
        >
          Editar
        </button>
        <button
          className="btn btn-danger w-100"
          type="button"
          id="delete"
          data-bs-toggle="modal"
          data-bs-target="#modalForm"
          onClick={() => {
            setAction("delete");
          }}
        >
          Eliminar
        </button>
      </div>
      <ModalFrom action={action} task={{}} />
    </>
  );
};

export default FormControls;
