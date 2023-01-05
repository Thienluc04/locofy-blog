import React, { useState } from "react";
import { useController } from "react-hook-form";

const Radio = ({ checked, control, name, children, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <label>
      <div className="flex justify-start items-center gap-[10px] cursor-pointer">
        <input
          checked={checked}
          type="radio"
          className=" invisible h-1 w-[-1px] absolute"
          {...field}
          {...props}
        />
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            checked ? "bg-primaryColor text-white" : "border border-slate-300"
          }`}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              style={{ fill: "#fff", transform: "", msfilter: "" }}
            >
              <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
            </svg>
          </span>
        </div>
        <span className="text-lg">{children}</span>
      </div>
    </label>
  );
};

export default Radio;
