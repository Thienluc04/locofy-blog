import React from "react";

const Footer = ({ children, className = "" }) => {
  return (
    <div className="flex flex-col gap-[65px] justify-center items-center">
      <p className="font-normal text-gray">
        © 2022, Locofy Pte Ltd. All Rights Reserved.
      </p>
      <div className="mb-[50px]">
        <img src="/footer.png" alt="footer-img" />
      </div>
    </div>
  );
};

export default Footer;
