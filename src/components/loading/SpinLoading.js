import React from "react";

const SpinLoading = ({ className = "" }) => {
  return (
    <>
      <span
        className={`w-12 h-12 mx-auto block border-[4px] rounded-full border-t-transparent  border-primaryColor animate-spin ${className}`}
      ></span>
    </>
  );
};

export default SpinLoading;
