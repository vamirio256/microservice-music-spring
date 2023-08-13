import React from "react";

const Footer = ({ className }) => {
  return (
    <div className={`text-[13px] font-light ${className}`}>
      <div>
        <a className="cursor-pointer text-gray-300 hover:text-gray-500 mr-2">
          Legal
        </a>
        <a className="cursor-pointer text-gray-300 hover:text-gray-500 mr-2">
          Privacy
        </a>
        <a className="cursor-pointer text-gray-300 hover:text-gray-500 mr-2">
          Cookie Policy
        </a>
        <a className="cursor-pointer text-gray-300 hover:text-gray-500 mr-2">
          Imprint
        </a>
        <a className="cursor-pointer text-gray-300 hover:text-gray-500 mr-2">
          Consent Manager
        </a>
        <a className="cursor-pointer text-gray-300 hover:text-gray-500 mr-2">
          Blog
        </a>
        <a className="cursor-pointer text-gray-300 hover:text-gray-500 mr-2">
          Charts
        </a>
      </div>
      <a className="hover:bg-gray-100 cursor-pointer">
        <span className="text-blue-500">Language:</span> English (US)
      </a>
    </div>
  );
};

export default Footer;
