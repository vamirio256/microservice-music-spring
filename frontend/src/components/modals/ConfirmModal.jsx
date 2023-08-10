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
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <CustomModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
      <p>Do you really want to logout?</p>
      <div className="flex flex-row justify-center mt-4">
        <button
          onClick={logout}
          className="bg-[#f50] px-2 py-1 rounded-md border border-solid"
        >
          Yes
        </button>
        <button
          onClick={closeModal}
          className="px-2 py-1 rounded-md border border-solid"
        >
          Cancel
        </button>
      </div>
    </CustomModal>
  );
};

export default ConfirmModal;
