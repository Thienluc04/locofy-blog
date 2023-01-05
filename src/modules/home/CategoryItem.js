import React, { useState } from "react";

const CategoryItem = ({ children }) => {
  const [active, setActive] = useState();

  return (
    <div
      className={`bg-white rounded-lg border border-[#BAC2D6] ${
        active ? "bg-[rgba(69,_126,_255,_0.06)]" : "bg-white"
      }`}
    >
      <div
        onClick={() => setActive(!active)}
        className={`cursor-pointer block px-[30px] py-[14px] uppercase ${
          active ? "text-primaryColor" : "text-headingColor"
        } text-[17px] leading-8 font-semibold font-fontCategory`}
      >
        {children}
      </div>
    </div>
  );
};

export default CategoryItem;
