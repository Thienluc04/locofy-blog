import axios from "axios";
import { Heading } from "components/heading";
import { InputSearch } from "components/input";
import { SpinLoading } from "components/loading";
import BlogItem from "modules/home/BlogItem";
import BlogsList from "modules/home/BlogsList";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { linkAPI } from "util/constant";
import { debounce } from "lodash";
import NotFoundPage from "./NotFoundPage";

const CategoryPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [linkData, setLinkData] = useState(`${linkAPI}/api/blogs`);

  const { slug } = useParams();

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(linkData);
      setBlogs(data);
    }

    fetchData();
  }, [linkData, slug]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`${linkAPI}/api/categories`);
      data.forEach((item) => {
        if (item.slug === slug) {
          setCategoryName(item.name);
        }
      });
    }

    fetchData();
  }, [slug]);

  const handleSearchBlog = debounce((e) => {
    setLinkData(`${linkAPI}/api/blogs?title_like=${e.target.value}`);
  }, 300);
  if (!slug) return <NotFoundPage></NotFoundPage>;
  return (
    <>
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
            Blog of category {categoryName}:
          </Heading>
          <InputSearch onChange={handleSearchBlog}></InputSearch>
        </div>
        <div className="mt-10">
          {blogs.length <= 0 && <SpinLoading></SpinLoading>}

          {blogs.length > 0 && (
            <BlogsList>
              {blogs &&
                blogs.map(
                  (item) =>
                    item.category.slug === slug && (
                      <BlogItem key={item.id} data={item}></BlogItem>
                    )
                )}
            </BlogsList>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
