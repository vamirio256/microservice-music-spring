import React from "react";

const Avatar = ({ className, src }) => {
  return (
    <>
      {src ? (
        <img src={src} className={`${className}`} />
      ) : (
        <div className={`bg-gradient-to-tl from-[#70929c] to-[#846170] ${className}`} />
      )}
    </>
  );
};

export default Avatar;
