import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "react-modal";
const CustomModal = ({ classname, children }) => {
  const modalIsOpen = useSelector((state) => state.modalReducer);

  const dispatch = useDispatch();
  function closeModal() {
    dispatch({ type: "CLOSE_MODAL" });
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      style={{
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        content: {
          inset: "0",
          position: "relative",
          width: "450px",
          height: "500px",
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
