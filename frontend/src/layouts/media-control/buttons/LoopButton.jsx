import React, { useState } from "react";
import { BsRepeat } from "react-icons/bs";

const LoopButton = ({ className }) => {
  const [isLoop, setIsLoop] = useState(false);

  return (
    <button>
      <BsRepeat className={`${className}`} style={{ fontSize: "1.15rem" }} />
    </button>
  );
};

export default LoopButton;
