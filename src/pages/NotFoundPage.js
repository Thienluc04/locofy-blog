import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10 py-10">
      <Link to={"/"}>
        <img src="/logo.png" alt="" />
      </Link>
      <div className="">
        <img src="/page-not-found.png" alt="" />
      </div>
    </div>
  );
};

export default NotFoundPage;
