import axios from "axios";
import { Author } from "components/author";
import { SpinLoading } from "components/loading";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { linkAPI, roleUser, statusBlog } from "util/constant";

const LargeBlog = ({ className = "" }) => {
  const [blogData, setBlogData] = useState();
  const [author, setAuthor] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${linkAPI}/blogs`);
        data.forEach((item) => {
          if (item.hot === true && item.status === statusBlog.APPROVED) {
            setBlogData([item]);
          }
        });
      } catch (error) {
        throw new Error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    (async () => {
      if (blogData && blogData[0]?.author?.id) {
        const response = await axios.get(
          `${linkAPI}/users/${blogData[0]?.author?.id}`
        );
        setAuthor(response.data);
      }
    })();
  }, [blogData]);

  useEffect(() => {
    switch (author?.role) {
      case roleUser.ADMIN:
        setRole("Admin");
        break;
      case roleUser.MODERATOR:
        setRole("Moderator");
        break;
      case roleUser.USER:
        setRole("User");
        break;
      default:
        break;
    }
  }, [author?.role]);

  return (
    <div
      className={`flex lg:flex-row flex-col justify-center items-center rounded-lg p-3 lg:p-6 lg:gap-5 ${className}`}
    >
      {!blogData && <SpinLoading></SpinLoading>}
      {blogData?.length > 0 &&
        blogData?.map((item) => (
          <Fragment key={item.id}>
            <div className="py-[10px] lg:pr-5 flex flex-col">
              <div className="flex gap-3">
                <Link
                  to={`/category/${item?.category?.slug}`}
                  className="text-primary uppercase font-bold text-lg"
                >
                  {item?.category?.name}
                </Link>
                <span
                  className="py-1 px-2 text-textColor font-fontCategory text-sm 
              bg-[#EBEEF2] rounded-[6px]"
                >
                  {item?.createdAt}
                </span>
              </div>
              <h1 className="my-[6px] font-bold text-[30px] lg:text-[40px] max-w-[405px] leading-[40px] lg:leading-[50px]">
                {item?.title}
              </h1>
              <p className="lg:text-xl text-lg text-headingColor mb-5 max-w-[405px] leading-7 lg:leading-8">
                {item?.description.slice(0, 100) + "..."}
              </p>
              <Link
                to={`/${item?.slug}`}
                className="bg-[#F4F7FC] rounded-[22px] text-primaryColor 
              flex justify-center items-center gap-[10px] max-w-[234px] h-11 font-fontCategory"
              >
                <span>Continue reading</span>
                <svg
                  width={16}
                  height={15}
                  viewBox="0 0 16 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.14954 1.63214C6.85664 1.33924 6.85664 0.864369 7.14954 0.571476C7.44243 0.278583 7.91731 0.278583 8.2102 0.571477L15.1388 7.5001L8.2102 14.4287C7.91731 14.7216 7.44243 14.7216 7.14954 14.4287C6.85664 14.1358 6.85664 13.661 7.14954 13.3681L12.2676 8.25H0.919922C0.505708 8.25 0.169922 7.91421 0.169922 7.5C0.169922 7.08579 0.505708 6.75 0.919922 6.75H12.2674L7.14954 1.63214Z"
                    fill="#457EFF"
                  />
                </svg>
              </Link>
              <div className="w-full h-[1px] bg-[#ECF0F6] mt-6"></div>
              <Author
                authorLink={`/author/${item?.author?.name}`}
                avatar={item?.author?.avatar}
                authorName={item?.author?.name}
                role={role}
                className="mt-6"
              ></Author>
            </div>
            <div>
              <Link to={`/${item?.slug}`}>
                <img
                  srcSet={
                    item?.image?.url ? item.image.url : "/large-blog.png 2x"
                  }
                  alt="large-blog"
                  draggable={false}
                  className="w-[800px] max-h-[500px] object-cover rounded-lg"
                />
              </Link>
            </div>
          </Fragment>
        ))}
    </div>
  );
};

export default LargeBlog;
