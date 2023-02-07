import axios from "axios";
import { Heading } from "components/heading";
import { InputSearch } from "components/input";
import { SpinLoading } from "components/loading";
import BlogItem from "modules/home/BlogItem";
import BlogsList from "modules/home/BlogsList";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { linkAPI } from "util/constant";
import { debounce } from "lodash";

const AllBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [linkData, setLinkData] = useState(`${linkAPI}/blogs`);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(linkData);
      setBlogs(data);
    }

    fetchData();
  }, [linkData]);
  const handleSearchBlog = debounce((e) => {
    setLinkData(`${linkAPI}/blogs?title_like=${e.target.value}`);
  }, 300);

  return (
    <Fragment>
      <div className="lg:max-w-[1200px] py-5 lg:py-10 mx-auto">
        <Link to={"/"}>
          <img
            className="mx-auto w-[180px] lg:w-[242px]"
            src="/logo.png"
            alt=""
          />
        </Link>
        <div className="flex lg:flex-row flex-col gap-5 items-center justify-between mt-5 lg:mt-10">
          <Heading className=" text-primaryColor font-fontHeading">
            Locofy all blog:
          </Heading>
          <InputSearch onChange={handleSearchBlog}></InputSearch>
        </div>
        <div className="mt-10">
          {blogs.length <= 0 && <SpinLoading></SpinLoading>}

          {blogs.length > 0 && (
            <BlogsList>
              {blogs &&
                blogs.map((item) => (
                  <BlogItem key={item.id} data={item}></BlogItem>
                ))}
            </BlogsList>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default AllBlog;
