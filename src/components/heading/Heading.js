import React from "react";

const Heading = ({ children, className = "" }) => {
  return (
    <h1
      className={`font-semibold text-2xl leading-7 text-headingColor font-primary ${className}`}
    >
      {children}
    </h1>
  );
};

export default Heading;
