import React from "react";

const Label = ({ htmlFor = "", className = "", children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-textColor cursor-pointer ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
