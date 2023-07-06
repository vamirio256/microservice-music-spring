import React from "react";
import { twMerge } from "tailwind-merge";

const Box = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        `
        bg-slate-300
        rounded-lg
        h-full
        w-fit
    `,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Box;
