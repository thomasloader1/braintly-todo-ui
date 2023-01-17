import React, { useContext, useState } from "react";
import { AppContext } from "../Provider/StateProvider";
import { useFormAlert } from "../hooks/useFormAlert";
import axios from "axios";
const FormControls = () => {
  const { selectTask, setSelectTask, setEventOnTask } = useContext(AppContext);
  const [action, setAction] = useState(null);
  const [fetching, setFetching] = useState(false);
  const { fetching: fetchHook, handleConfirm } = useFormAlert();

  const handleComplete = async () => {
    setAction("complete");
    setFetching(true);

    const response = await axios.put(
      `http://localhost:8000/api/tasks/${selectTask.id}`,
      {
        ...selectTask,
        is_completed: 1,
      }
    );
    console.log(response.data);
    setFetching(false);

    setEventOnTask((prevState) => {
      if (prevState === action) {
        return prevState + action;
      } else {
        return action;
      }
    });
    setSelectTask(null);
  };

  return (
    <>
      <div className="btn-group d-flex my-3">
        <button
          className="btn btn-success w-100"
          type="button"
          id="complete"
          onClick={handleComplete}
          disabled={fetching || fetchHook}
        >
          {(fetching || fetchHook) && action === "complete" ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Procesando</span>
            </>
          ) : (
            "Finalizar"
          )}
        </button>
        <button
          className="btn btn-primary w-100"
          type="button"
          id="edit"
          onClick={() => {
            handleConfirm("edit");
            setAction("edit");
          }}
          disabled={fetching || fetchHook}
        >
          {(fetching || fetchHook) && action === "edit" ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Procesando</span>
            </>
          ) : (
            "Editar"
          )}
        </button>
        <button
          className="btn btn-danger w-100"
          type="button"
          id="delete"
          onClick={() => {
            handleConfirm("delete");
            setAction("delete");
          }}
          disabled={fetching || fetchHook}
        >
          {(fetching || fetchHook) && action === "delete" ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Procesando</span>
            </>
          ) : (
            "Eliminar"
          )}
        </button>
      </div>
    </>
  );
};

export default FormControls;
