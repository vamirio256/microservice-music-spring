import React from "react";

import Modal from "react-modal";

Modal.setAppElement("#root");

const CustomModal = ({ classname, children, modalIsOpen, closeModal }) => {
  return (
    // <CSSTransition
    //   in={modalIsOpen}
    //   timeout={300}
    //   unmountOnExit
    //   appear
    // >

    modalIsOpen && (
      <div className="w-full h-full fixed flex justify-center z-max">
        {/* overlay */}
        <div
          className="bg-black bg-opacity-20 absolute w-full h-full"
          onClick={closeModal}
        ></div>
        {/* content */}
        <div className="relative bg-white w-fit p-10 rounded-md shadow-md h-fit  animate-slide-down top-[200px]">
          {children}
        </div>
      </div>
    )

    // </CSSTransition>
  );
};

export default CustomModal;
