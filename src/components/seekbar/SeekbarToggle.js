import React, { useState } from "react";
import { useController } from "react-hook-form";

const SeekbarToggle = ({ on, control, name, onClick = () => {}, ...props }) => {
  return (
    <>
      <label>
        <input
          checked={on}
          type="checkbox"
          onChange={() => {}}
          className="invisible h-0 w-0 absolute"
        />
        <div
          onClick={onClick}
          className={`cursor-pointer w-[100px] h-[48px]  rounded-3xl relative p-1 
          ${on ? "bg-primaryColor" : "bg-slate-300"}`}
        >
          <div
            className={`absolute w-[40px] h-[40px]  bg-white rounded-full transition-all
            ${on ? "translate-x-[50px]" : ""}`}
          ></div>
        </div>
      </label>
    </>
  );
};

export default SeekbarToggle;
