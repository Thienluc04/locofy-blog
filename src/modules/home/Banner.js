import axios from "axios";
import { Heading } from "components/heading";
import { Infor } from "components/infor";
import { SpinLoading } from "components/loading";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { linkAPI, statusBlog } from "util/constant";

const Banner = () => {
  const [blog, setBlog] = useState();
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`${linkAPI}/api/blogs`);
      data.forEach((item) => {
        if (item.hot === false) {
          setBlog(item);
        }
      });
    }

    fetchData();
  }, []);

  return (
    <>
      {!blog && <SpinLoading></SpinLoading>}
      {blog?.status === statusBlog.APPROVED && (
        <div className="flex border flex-col lg:flex-row lg:max-h-[350px] border-[#DEE3EB] rounded-xl relative">
          <div className="hidden lg:block absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            <img
              src={blog?.author?.avatar}
              className="lg:w-[120px] w-[100px] lg:h-[120px] h-[100px] rounded-full border-[4px] border-white object-cover"
              alt=""
            />
          </div>
          <Link to={`/${blog?.slug}`} className="flex-1">
            <img
              className="object-cover max-h-full w-full rounded-xl lg:rounded-none lg:rounded-l-xl"
              src={blog?.image?.url}
              alt="banner-img"
            />
          </Link>
          <div className="flex-1">
            <div className="lg:ml-[70px] lg:mt-12 lg:mr-7 p-4 lg:p-0">
              <Infor
                to={`/category/${blog?.category?.slug}`}
                normal
                heading={blog?.category?.name}
                time={blog?.createdAt}
              ></Infor>
              <Link
                to={`/${blog?.slug}`}
                className="font-fontHeading text-[30px] lg:text-[40px] font-bold leading-[40px] lg:leading-[50px] mb-2"
              >
                {blog?.title}
              </Link>
              <p className="text-headingColor">
                {blog?.description.slice(0, 100) + "..."}
              </p>
              <div className="line mt-3"></div>
              <div className="flex justify-between items-center">
                <p className="text-[#ADB5C6] font-fontCategory text-lg">
                  Posted by{" "}
                  <span className="text-textColor font-semibold">
                    {blog?.author?.name}
                  </span>
                </p>
                <p className="text-sm text-gray">Posted on {blog?.createdAt}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
