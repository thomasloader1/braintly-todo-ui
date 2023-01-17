import React from "react";

const ModalFrom = ({ action, task }) => {
  return (
    <div
      class="modal fade"
      id="modalForm"
      tabindex="-1"
      aria-labelledby="modalFormLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="modalFormLabel">
              Modal {action}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button type="button" class="btn btn-primary">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFrom;
