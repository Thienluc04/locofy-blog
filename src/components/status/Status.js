import React from "react";

const Status = ({ type, children, className = "" }) => {
  return (
    <div
      className={`${
        type === 1
          ? "text-green-500 bg-green-100"
          : type === 2
          ? "text-yellow-500 bg-yellow-100"
          : type === 3
          ? "text-red-500 bg-red-100"
          : ""
      } p-2 text-center rounded-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default Status;
