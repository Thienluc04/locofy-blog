import axios from "axios";
import { Author } from "components/author";
import { Infor } from "components/infor";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { linkAPI, statusBlog } from "util/constant";

const FeaturedBlogItem = ({ data }) => {
  return (
    <>
      {data?.hot === true && data?.status === statusBlog.APPROVED && (
        <div
          key={data?.id}
          className=" lg:w-[590px] lg:h-[250px] flex-wrap flex lg:gap-3 border border-[#DEE3EB] 
        rounded-lg"
        >
          <Link to={`/${data?.slug}`} className="w-[40%] h-full">
            <img
              className="w-full h-full object-center object-cover rounded-l-lg"
              src={data?.image?.url}
              alt=""
            />
          </Link>
          <div className=" flex flex-col flex-1 gap-3 lg:gap-0  p-4 justify-between">
            <div className=" flex flex-col">
              <Infor
                to={`/category/${data?.category?.slug}`}
                heading={data?.category?.name}
                time={data?.createdAt}
                normal
              ></Infor>
              <Link
                to={`/${data?.slug}`}
                className=" font-bold text-[20px] lg:text-[28px] leading-6 lg:leading-[34px]"
              >
                {data?.title}
              </Link>
            </div>
            <div className="w-full h-[1px] bg-[#ECF0F6] "></div>
            <Author
              authorLink={`/author/${data?.author?.name}`}
              avatar={data?.author?.avatar}
              authorName={data?.author?.name}
              time={data?.createdAt}
              small
            ></Author>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedBlogItem;
