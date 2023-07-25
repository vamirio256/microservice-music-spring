import React from "react";

const SideBarSection = ({ header, icon, children }) => {
  return (
    <div>
      <div>
        <div className="flex flex-row items-center border-b mb-3">
          <span>{icon}</span>
          <span className="ml-3">{header}</span>
        </div>
      </div>
      {children}
    </div>
  );
};

export default SideBarSection;
