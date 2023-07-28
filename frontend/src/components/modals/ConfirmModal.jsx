import React from "react";
import CustomModal from "./CustomModal";
import { useDispatch, useSelector } from "react-redux";

const ConfirmModal = ({ className, children, context }) => {
  const modalIsOpen = useSelector(
    (state) => state.modalReducer.confirm.isShowed
  );
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch({
      type: "CLOSE_MODAL_CONFIRM",
    });
  };

  return (
    <CustomModal modalIsOpen={modalIsOpen} closeModel={closeModal}>
      <p>{context}</p>
      {children}
    </CustomModal>
  );
};

export default ConfirmModal;
