import axios from "api/axios";
import { Heading } from "components/heading";
import { InputSearch } from "components/input";
import { SpinLoading } from "components/loading";
import BlogItem from "modules/home/BlogItem";
import BlogsList from "modules/home/BlogsList";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { debounce } from "lodash";
import { linkAPI } from "util/constant";

const AuthorPage = () => {
  const { slug } = useParams();
  const [data, setData] = useState([]);
  const [linkData, setLinkData] = useState(`${linkAPI}/blogs`);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(linkData);
      let blogs = [];
      data.forEach((item) => {
        if (item.author.name === slug) {
          blogs.push(item);
        }
      });
      setData(blogs);
    }

    fetchData();
  }, [linkData, slug]);

  const handleSearchBlog = debounce((e) => {
    setLinkData(`${linkAPI}/blogs?title_like=${e.target.value}`);
  }, 300);

  return (
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
          Blog of user {data[0]?.author?.name}:
        </Heading>
        <InputSearch onChange={handleSearchBlog}></InputSearch>
      </div>
      <div className="mt-10">
        {data.length <= 0 && <SpinLoading></SpinLoading>}

        {data.length > 0 && (
          <BlogsList>
            {data &&
              data.map((item) => (
                <BlogItem key={item.id} data={item}></BlogItem>
              ))}
          </BlogsList>
        )}
      </div>
    </div>
  );
};

export default AuthorPage;
