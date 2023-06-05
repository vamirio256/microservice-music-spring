import React from "react";
import classNames from "classnames";

const Button = ({ className, onClick, context, primary, secondary }) => {
  const buttonClasses = classNames(
    "text-white bg-primary px-3 py-5 rounded-sm inline-block",
    {
      "bg-primary text-white": primary,
      "bg-white text-black": secondary,
    },
    className
  );

  return (
    <button className={buttonClasses} onClick={onClick}>
      {context}
    </button>
  );
};

export default Button;
