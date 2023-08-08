import React, { useState } from "react";
import { BsShuffle } from "react-icons/bs";

const ShuffleButton = () => {
  const [isSuffle, setIsSuffle] = useState(false);
  // const textColor = isFocused : "text-black" ? ""

  const toggleIsShuffle = () => {
    setIsSuffle(!isSuffle);
  };

  return (
    <button onClick={toggleIsShuffle}>
      <BsShuffle className={`
      ${isSuffle ? "text-[#f50]" : "text-black"}
      text-xl ml-3`} />
    </button>
  );
};

export default ShuffleButton;
