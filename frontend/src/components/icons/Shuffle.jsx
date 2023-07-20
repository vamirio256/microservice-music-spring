import React, { useState } from "react";
import { BsShuffle } from "react-icons/bs"

const Shuffle = ({ className }) => {
  const [isFocused, setIsFocused] = useState(false);
    // const textColor = isFocused : "text-black" ? ""

  const toggleIsFocused = () => {
    setIsFocused(!isFocused);
  };

  return (
    <button onClick={toggleIsFocused}>
      <BsShuffle className={`${className}`} style={{ }} />
    </button>
  );
};

export default Shuffle;
