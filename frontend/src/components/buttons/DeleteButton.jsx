import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";

const DeleteButton = ({
  className,
  haveBorder,
  haveText,
  title,
  context,
  onDelete,
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch({
      type: "OPEN_MODAL_CONFIRM",
      onConfirm: onDelete,
      context: context,
      title: title,
    });
  };

  return (
    <button
      className={`
    ${haveBorder ? "border" : ""}
    ${haveText ? "px-3 py-1" : "px-1 py-0.5"}
    text-xs flex items-center max-h-[26px] ${className}
    `}
      onClick={handleDelete}
    >
      <MdDelete className="mr-2 text-[16px]" />
      <p>Delete</p>
    </button>
  );
};

export default DeleteButton;
