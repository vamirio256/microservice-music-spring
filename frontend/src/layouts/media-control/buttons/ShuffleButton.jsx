import React, { useState } from "react";
import { BsShuffle } from "react-icons/bs";

const ShuffleButton = () => {
  const [isFocused, setIsFocused] = useState(false);
  // const textColor = isFocused : "text-black" ? ""

  const toggleIsFocused = () => {
    setIsFocused(!isFocused);
  };

  return (
    <button onClick={toggleIsFocused}>
      <BsShuffle className="text-xl ml-3" />
    </button>
  );
};

export default ShuffleButton;
