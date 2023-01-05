import React from "react";
import { Link } from "react-router-dom";

const Infor = ({
  className = "",
  heading = "Design to COde",
  time = "3 min read",
  normal,
  to = "",
}) => {
  return (
    <div className={`flex  items-center gap-3 ${className} `}>
      {to ? (
        <Link
          to={to}
          className={`text-primaryColor uppercase font-bold font-fontCategory ${
            normal ? "text-base" : "text-lg"
          }`}
        >
          {heading}
        </Link>
      ) : (
        <span
          className={`text-primaryColor uppercase font-bold font-fontCategory ${
            normal ? "text-base" : "text-lg"
          }`}
        >
          {heading}
        </span>
      )}
      <span
        className="py-1 px-2 text-textColor font-fontCategory text-sm 
      bg-[#EBEEF2] rounded-[6px]"
      >
        {time}
      </span>
    </div>
  );
};

export default Infor;
