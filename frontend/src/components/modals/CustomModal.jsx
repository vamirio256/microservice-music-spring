import React from "react";

import Modal from "react-modal";

Modal.setAppElement("#root");

const CustomModal = ({ className, children, modalIsOpen, closeModal }) => {
  return (
    // <CSSTransition
    //   in={modalIsOpen}
    //   timeout={300}
    //   unmountOnExit
    //   appear
    // >

    modalIsOpen && (
      <div
        className={`w-full h-full fixed flex justify-center z-max
      `}
      >
        {/* overlay */}
        <div
          className="bg-[hsla(0,0%,94.9%,.9)] absolute w-full h-full"
          onClick={closeModal}
        />
        {/* content */}
        <div
          className={`relative bg-white w-fit p-8 shadow-md h-fit animate-slide-down top-[100px] ${className}`}
        >
          {children}
        </div>
      </div>
    )

    // </CSSTransition>
  );
};

export default CustomModal;
