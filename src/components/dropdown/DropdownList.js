import React, { useState } from "react";
import { statusCategory } from "util/constant";
import { useDropdown } from "./dropdown-context";

const DropdownList = ({ list = [], onClick = () => {}, dropdownName }) => {
  const { show, toggle } = useDropdown();

  const handleDropdownName = (item) => {
    toggle();
    onClick && onClick(item);
  };
  return (
    <>
      <div className="relative">
        <div
          onClick={toggle}
          className="p-3 border border-slate-300 rounded-lg w-full mt-[10px] 
              font-semibold font-fontCategory flex justify-between cursor-pointer select-none
              "
        >
          {dropdownName || "Select the category"}
          {show ? (
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            </span>
          ) : (
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          )}
        </div>
        {show && (
          <div
            className="absolute p-3 flex flex-col gap-5 w-full border-[#fafafa] 
                border shadow-[10px_10px_20px_rgb(218_213_213_/_15%)] bg-white"
          >
            {list.length > 0 &&
              list.map(
                (item, index) =>
                  item.status === statusCategory.APPROVED && (
                    <div
                      key={index}
                      onClick={() => handleDropdownName(item.name)}
                      className="cursor-pointer hover:text-primaryColor"
                    >
                      {item.name}
                    </div>
                  )
              )}
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownList;
