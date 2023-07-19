import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "react-modal";

Modal.setAppElement("#root");

const CustomModal = ({ classname, children, modalIsOpen, closeModal }) => {
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
          width: "500px",
          height: "500px",
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
