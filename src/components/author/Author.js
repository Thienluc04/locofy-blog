import React from "react";
import { Link } from "react-router-dom";

const Author = ({
  className = "",
  avatar = "https://images.unsplash.com/photo-1618835962148-cf177563c6c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
  authorName = "Anna Rosé",
  role = "",
  small,
  authorLink = "",
}) => {
  return (
    <div className={`flex gap-[10px] ${className}`}>
      <div className={`${small ? "w-[40px] h-[40px]" : "w-[50px] h-[50px]"}`}>
        <Link to={authorLink}>
          <img
            src={avatar}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        </Link>
      </div>
      <div className="flex flex-col justify-center gap-[2px]">
        <p className="text-textColor font-fontCategory font-semibold text-[17px] leading-5">
          {authorName}
        </p>
        <span className="text-gray text-sm leading-4">{role}</span>
      </div>
    </div>
  );
};

export default Author;
