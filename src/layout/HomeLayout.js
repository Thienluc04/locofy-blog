import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../modules/home/Footer";
import Header from "../modules/home/Header";

const HomeLayout = () => {
  return (
    <div className="bg-primary">
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
