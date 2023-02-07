import { Heading } from "components/heading";
import { Infor } from "components/infor";
import Subscribe from "modules/common/Subscribe";
import BlogItem from "modules/home/BlogItem";
import BlogsList from "modules/home/BlogsList";
import { v4 } from "uuid";
import React from "react";
import { Link, useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import { useEffect } from "react";
import axios from "axios";
import { linkAPI, statusBlog } from "util/constant";
import { useState } from "react";
import parse from "html-react-parser";
import { SpinLoading } from "components/loading";

const ArticlePage = () => {
  const { slug } = useParams();
  const [blogInfo, setBlogInfo] = useState();
  const [blogSuggest, setBlogSuggest] = useState([]);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const { data } = await axios.get(`${linkAPI}/blogs`);
        data.forEach((item) => {
          if (item.slug === slug) {
            setBlogInfo(item);
          }
        });
      } catch (error) {
        throw new Error(error);
      }
    }

    fetchBlog();
  }, [slug]);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const { data } = await axios.get(`${linkAPI}/blogs`);
        setBlogSuggest(data);
      } catch (error) {
        throw new Error(error);
      }
    }

    fetchBlog();
  }, []);

  return (
    <>
      {blogInfo?.status === statusBlog.APPROVED && (
        <div className="max-w-[1114px] mb-[45px] mx-auto">
          <div className="flex w-full mx-auto gap-9 my-11">
            <div className="hidden lg:flex flex-col gap-6">
              <Link to={"/"} className="flex gap-2 text-[#5E6A86]">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </span>
                <span>Blogs</span>
              </Link>
              <div className="p-4 bg-white rounded-lg max-w-[235px]">
                <h1 className="font-primary text-headingColor text-lg font-semibold mb-4">
                  Table of Contents
                </h1>
                <div className="flex flex-col gap-[10px]">
                  <div>
                    <span className="text-[#5E6A86]">Introduction</span>
                  </div>
                  <div>
                    <span className="text-[#5E6A86]">Zero Friction</span>
                  </div>
                  <div>
                    <span className="text-[#5E6A86]">AI Powered</span>
                  </div>
                  <div>
                    <span className="text-[#5E6A86]">
                      View Code & Digest Dynamic Data
                    </span>
                  </div>
                  <div>
                    <span className="text-[#5E6A86]">
                      Share & Collaborate Seamlessly with Locofy Builder
                    </span>
                  </div>
                  <div>
                    <span className="text-[#5E6A86]">
                      Direct Export & Deploy
                    </span>
                  </div>
                  <div>
                    <span className="text-[#5E6A86]">Conclusion</span>
                  </div>
                </div>
              </div>
            </div>
            {!blogInfo && <SpinLoading></SpinLoading>}

            {blogInfo && (
              <div className="flex-1">
                <div className="lg:max-w-[762px] p-4 lg:p-0 mx-auto mb-8">
                  <Infor
                    heading={blogInfo?.category?.name}
                    time={blogInfo?.createdAt}
                  ></Infor>
                  <Heading className="font-fontHeading text-[30px] lg:!text-[53px] font-bold leading-[40px] lg:!leading-[64px] my-1">
                    {blogInfo?.title}
                  </Heading>

                  <p className="text-xl leading-[34px] text-headingColor">
                    {blogInfo?.description}
                  </p>
                  <div className="text-xl leading-[34px] text-headingColor mt-5">
                    {parse(`${blogInfo?.content}`)}
                  </div>
                </div>
              </div>
            )}
          </div>
          <Subscribe></Subscribe>
          <div className="line hidden lg:block mt-7"></div>
          <Heading className="px-4 lg:px-0 my-7">You may also like</Heading>
          <BlogsList>
            {blogSuggest.length > 0 &&
              blogSuggest.map(
                (item) =>
                  item.category.name === blogInfo.category.name &&
                  item.slug !== blogInfo.slug &&
                  item.status === statusBlog.APPROVED && (
                    <BlogItem key={item.id} data={item}></BlogItem>
                  )
              )}
          </BlogsList>
        </div>
      )}
    </>
  );
};

export default ArticlePage;
