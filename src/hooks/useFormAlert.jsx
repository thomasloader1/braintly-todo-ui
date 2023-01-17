import { useContext, useRef, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import moment from "moment";
import { AppContext } from "../Provider/StateProvider";
import axios from "axios";

export const useFormAlert = () => {
  const {
    selectTask: task,
    priorities,
    setEventOnTask,
    setSelectTask,
  } = useContext(AppContext);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [fetching, setFetching] = useState(false);

  const formRef = useRef(null);
  const reactSwal = withReactContent(Swal);
  const handleSubmit = (evt) => {};
  const handleChange = (evt) => {
    const { value } = evt.target;
    setTaskTitle(value);
  };
  const optionsChildren = priorities.map((priority) => (
    <option
      key={priority.id}
      value={priority.id}
      selected={priority.id === task.priority_id}
    >
      {priority.name}
    </option>
  ));

  const handleConfirm = (action) => {
    const ENDPOINT = {
      URI: `http://localhost:8000/api/tasks/${task.id}`,
    };

    reactSwal
      .fire({
        title: <p>{action === "delete" ? "Eliminar" : "Editar"} Tarea</p>,
        showCancelButton: true,
        confirmButtonText: action === "delete" ? "Eliminar" : "Editar",
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        onBeforeOpen: () => {
          Swal.showLoading();
        },
        html: (
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                name="task_title"
                className="form-control"
                placeholder="Realizar deploy back-end"
                defaultValue={taskTitle}
                onChange={handleChange}
                disabled={action === "delete"}
              />
              <select
                className="form-select btn btn-secondary "
                name="priority_id"
                disabled={action === "delete"}
              >
                <option selected>Prioridad</option>
                {optionsChildren}
              </select>
            </div>

            <div className="input-group">
              <span className="input-group-text bg-secondary text-white disabled">
                Realizar antes de
              </span>
              <input
                type="date"
                name="date"
                id="date"
                defaultValue={moment(task.due_date).format("YYYY-MM-DD")}
                className="form-control"
                disabled={action === "delete"}
              />
              <input
                type="time"
                name="time"
                id="time"
                defaultValue={moment(task.due_date).format("HH:mm")}
                className="form-control"
                disabled={action === "delete"}
              />
            </div>
            <div class="form-check form-switch mt-3 d-flex justify-content-between">
              <input
                class="form-check-input me-2"
                type="checkbox"
                id="is_completed"
                name="is_completed"
                defaultChecked={task.is_completed > 0}
              />
              <label class="form-check-label me-auto" for="is_completed">
                Tarea completada
              </label>
            </div>
          </form>
        ),
        preConfirm: () => {
          setFetching(true);
          const formData = new FormData(formRef.current);

          const dueDate = moment(
            `${formData.get("date")} ${formData.get("time")}`
          ).format("YYYY-MM-DD hh:mm:ss");

          formData.delete("date");
          formData.delete("time");

          console.log(formData);
          if (action === "edit") {
            axios
              .put(ENDPOINT.URI, {
                ...task,
                title: formData.get("task_title"),
                priority_id: formData.get("priority_id"),
                due_date: dueDate,
                is_completed: formData.get("is_completed") !== null ? 1 : 0,
              })
              .then((res) => {
                console.log(res);

                setEventOnTask((prevState) => {
                  if (prevState === action) {
                    return prevState + action;
                  } else {
                    return action;
                  }
                });
                setFetching(false);
                setSelectTask(null);
              });
          } else {
            axios.delete(ENDPOINT.URI).then((res) => {
              console.log(res);
              setEventOnTask((prevState) => {
                if (prevState === action) {
                  return prevState + action;
                } else {
                  return action;
                }
              });
              setFetching(false);
              setSelectTask(null);
            });
          }
        },
      })
      .then((result) => {
        formRef.current.reset();
        setTaskTitle("");
      });
  };

  return {
    fetching,
    handleConfirm,
  };
};
