import { Button } from "components/button";
import React from "react";

const Subscribe = ({ className = "" }) => {
  return (
    <div
      className={`flex lg:flex-row flex-col p-4 items-center mx-4 lg:mx-0 lg:px-8 lg:pt-12 lg:pb-11 lg:gap-6 bg-[rgba(190,_194,_234,_0.05)] 
      rounded-lg border border-[#DEE3EB] ${className}`}
    >
      <div className="relative ">
        <div className="absolute top-[-100%] translate-y-[30%] hidden lg:block">
          <img src="/subcribe.png" alt="" />
        </div>
        <h1 className="lg:text-[32px] text-2xl font-bold lg:leading-[38px] text-center lg:text-left">
          Keep your loco mode on!
        </h1>
        <p className="lg:text-[22px] py-2 lg:py-0 lg:leading-[36px] text-lg text-center lg:text-left text-headingColor mt-1">
          Stay updated on the latest Locofy announcements and product updates
        </p>
      </div>
      <div className="flex lg:flex-row flex-col items-center gap-[10px]">
        <input
          type="email"
          className="h-[56px] w-[320px] lg:w-[394px] py-[14px] px-4  text-lg leading-7 bg-white border : ;
          border-[#DEE3EB] rounded-md "
          placeholder="Enter email address"
        />
        <Button className="font-primary rounded-md text-lg font-medium h-[56px]">
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default Subscribe;
