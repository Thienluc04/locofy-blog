import axios from "axios";
import { Heading } from "components/heading";
import Subscribe from "modules/common/Subscribe";
import Banner from "modules/home/Banner";
import BlogItem from "modules/home/BlogItem";
import BlogsList from "modules/home/BlogsList";
import CategoryItem from "modules/home/CategoryItem";
import CategoryList from "modules/home/CategoryList";
import FeaturedBlogItem from "modules/home/featured/FeaturedBlogItem";
import FeaturedBlogs from "modules/home/featured/FeaturedBlogs";
import LargeBlog from "modules/home/LargeBlog";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { linkAPI } from "util/constant";

const HomePage = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [allBlog, setAllBlog] = useState();

  useEffect(() => {
    document.title = "Locofy Blog Home";
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${linkAPI}/api/blogs`);
        setAllBlog(data);
      } catch (error) {
        throw new Error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${linkAPI}/api/blogs`);
        setFeaturedBlogs(data);
      } catch (error) {
        throw new Error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="bg-white max-w-[1200px] mx-auto mt-[65px] rounded-lg">
        <LargeBlog></LargeBlog>
        <div className="lg:mt-[65px] mt-10">
          <Heading className="mb-5 lg:px-0 px-4">Editor’s Pick</Heading>
          <FeaturedBlogs>
            {featuredBlogs.map((item, index) => {
              if (index <= 4) {
                return (
                  <FeaturedBlogItem
                    key={item.id}
                    data={item}
                  ></FeaturedBlogItem>
                );
              }
            })}
          </FeaturedBlogs>
          <div className="lg:mt-[65px] mt-10 lg:mb-[30px] mb-5 px-4 lg:px-0 flex justify-between items-center gap-5 ">
            <Heading className="">Discover more topics</Heading>
            <Link
              to={"/blogs"}
              className="text-sm lg:text-base font-fontCategory text-primaryColor"
            >
              All blog...
            </Link>
          </div>
          <BlogsList>
            <BlogItem data={allBlog && allBlog[0]}></BlogItem>
            <BlogItem data={allBlog && allBlog[1]}></BlogItem>
            <BlogItem data={allBlog && allBlog[2]}></BlogItem>
          </BlogsList>
        </div>
        <div className="mt-10 px-4 lg:px-0 lg:mt-[65px]">
          <Heading className="mb-5">Guest Author Entry</Heading>
          <Banner></Banner>
        </div>
        <div className="my-10 lg:my-[65px]">
          <Subscribe></Subscribe>
        </div>
      </div>
    </>
  );
};

export default HomePage;
