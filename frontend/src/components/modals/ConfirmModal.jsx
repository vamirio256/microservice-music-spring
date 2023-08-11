import React from "react";
import CustomModal from "./CustomModal";
import { useDispatch, useSelector } from "react-redux";

const ConfirmModal = ({ className, children, context }) => {
  const modalIsOpen = useSelector(
    (state) => state.modalReducer.confirm.isShowed
  );
  const confirm = useSelector((state) => state.modalReducer.confirm);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({
      type: "CLOSE_MODAL_CONFIRM",
    });
  };

  const handleConfirm = () => {
    confirm.onConfirm();
    closeModal();
  };

  return (
    <CustomModal
      modalIsOpen={modalIsOpen}
      closeModal={closeModal}
      className={"text-[13px] !w-[450px]"}
    >
      {children}
      <h1 className="border-b text-xl pb-2 font-normal">{confirm.title}</h1>
      <p className="mt-4 ">{confirm.context}</p>
      <div className="flex flex-row justify-end mt-4">
        <button onClick={closeModal} className="px-1 py-0.5">
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="px-1.5 py-0.5 rounded-[3px] ml-3 border"
        >
          Confirm
        </button>
      </div>
    </CustomModal>
  );
};

export default ConfirmModal;
