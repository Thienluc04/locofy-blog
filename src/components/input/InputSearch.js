import React from "react";

const InputSearch = ({
  placeholder = "Search blog...",
  onChange = () => {},
  className = "",
}) => {
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        className={`p-4 w-[300px] border border-gray rounded-lg ${className}`}
        onChange={onChange}
      />
    </>
  );
};

export default InputSearch;
