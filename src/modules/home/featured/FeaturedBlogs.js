import React from "react";

const FeaturedBlogs = ({ className = "", children }) => {
  return (
    <div className={`flex flex-wrap lg:px-0 px-4 gap-5 ${className}`}>
      {children}
    </div>
  );
};

export default FeaturedBlogs;
