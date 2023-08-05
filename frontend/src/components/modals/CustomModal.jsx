import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "react-modal";
import { CSSTransition } from "react-transition-group";

Modal.setAppElement("#root");

const CustomModal = ({ classname, children, modalIsOpen, closeModal }) => {
  return (
    // <CSSTransition
    //   in={modalIsOpen}
    //   timeout={300}
    //   unmountOnExit
    //   appear
    // >
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      contentLabel="Example Modal"
      style={{
        overlay: {
          display: "flex",
          justifyContent: "center",
          // alignItems:"baseline"
          alignItems: "center",
        },
        content: {
          inset: "0",
          position: "relative",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginLeft: "10px",
          marginRight: "10px",
          // width: "500px",
          // height: "500px",
        },
      }}
    >
      {children}
    </Modal>
    // </CSSTransition>
  );
};

export default CustomModal;
