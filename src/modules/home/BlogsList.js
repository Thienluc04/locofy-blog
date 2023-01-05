import React from "react";

const BlogsList = ({ children, className = "" }) => {
  return (
    <div
      className={`flex flex-wrap px-4 lg:px-0 gap-5 lg:gap-[30px] ${className}`}
    >
      {children}
    </div>
  );
};

export default BlogsList;
