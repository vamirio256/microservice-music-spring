import React from "react";

const Card = ({ title, image, children }) => {
  return (
    <div className="card">
      {image && <img src={image} alt={title} />}
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default Card;
