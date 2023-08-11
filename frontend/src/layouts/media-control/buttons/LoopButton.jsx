import React, { useState } from "react";
import { BsRepeat } from "react-icons/bs";

const LoopButton = ({ loop, setLoop, className }) => {
  return (
    <button
      className="relative"
      onClick={() => {
        if (loop == 2) {
          setLoop(0);
        } else {
          setLoop(loop + 1);
        }
      }}
    >
      <BsRepeat
        className={`${className} text-[1.15rem] ${loop > 0 && "text-primary"}`}
      />
      {loop == 1 && (
        <div className="bg-primary rounded-full w-4 h-4 text-[0.5rem] text-white flex justify-center items-center scale-50 absolute bottom-[-3px] right-0">
          1
        </div>
      )}
    </button>
  );
};

export default LoopButton;
