import axios from "api/axios";
import { Author } from "components/author";
import { Heading } from "components/heading";
import { Infor } from "components/infor";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { linkAPI, statusBlog } from "util/constant";

const BlogItem = ({ data }) => {
  return (
    <>
      {data?.status === statusBlog.APPROVED && (
        <div className="w-[380px] flex flex-col border border-[#DEE3EB] rounded-lg">
          <Link to={`/${data?.slug}`} className="w-full h-[250px]">
            <img
              className="w-full h-full object-cover rounded-t-lg"
              src={data?.image?.url}
              alt=""
            />
          </Link>
          <div className="p-4 mt-1">
            <Infor
              to={`/category/${data?.category?.slug}`}
              heading={data?.category?.name}
              time={data?.createdAt}
              normal
            ></Infor>
            <Link
              to={`/${data?.slug}`}
              className="font-fontHeading text-[26px] font-bold leading-[34px] mt-1 mb-2"
            >
              {data?.title}
            </Link>
            <p className="mb-3">{data?.description.slice(0, 100) + "..."}</p>
            <div className="line"></div>
            <Author
              authorLink={`/author/${data?.author.name}`}
              authorName={data?.author?.name}
              time={data?.createdAt}
              avatar={data?.author?.avatar}
              small
            ></Author>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogItem;
