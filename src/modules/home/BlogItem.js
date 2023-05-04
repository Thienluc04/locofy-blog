import axios from "api/axios";
import { Author } from "components/author";
import { Heading } from "components/heading";
import { Infor } from "components/infor";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { linkAPI, roleUser, statusBlog } from "util/constant";

const BlogItem = ({ data }) => {
  const [author, setAuthor] = useState();
  const [role, setRole] = useState();
  // useEffect(() => {
  //   (async () => {
  //     if (data?.author?.id) {
  //       const response = await axios.get(
  //         `${linkAPI}/users/${data?.author?.id}`
  //       );
  //       setAuthor(response.data);
  //     }
  //   })();
  // }, [data?.author?.id]);

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
          <div className="p-4 mt-1 flex flex-col justify-between flex-1">
            <div>
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
            </div>
            <div>
              <div className="line"></div>
              <Author
                authorLink={`/author/${data?.author.name}`}
                authorName={data?.author?.name}
                role={role}
                avatar={data?.author?.avatar}
                small
              ></Author>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogItem;
