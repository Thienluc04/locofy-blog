import { Button } from "components/button";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { roleUser } from "util/constant";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-[rgba(255,_255,_255,_0.9)]">
      <div
        className="lg:max-w-[1600px] mx-auto flex justify-between items-center 
        lg:py-[26px] py-4 px-2"
      >
        <Link to={"/"}>
          <img src="/logo.png" className="w-[150px] lg:w-full" alt="logo" />
        </Link>
        <div className="flex gap-3 items-center">
          {/* {user && user?.email ? (
            <>
              {user?.role !== roleUser.USER && (
                <Button className="w-[100px] lg:w-[182px]" to="/manage/blogs">
                  Dashboard
                </Button>
              )}
              <Link to={"/profile"}>
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={user?.avatar?.url || "/banner.png"}
                  alt="logo"
                />
              </Link>
            </>
          ) : (
            <>
              <Button
                className="w-[100px] lg:w-[182px]"
                to="/login"
                kind="outline"
              >
                Login
              </Button>
              <Button
                className="w-[100px] lg:w-[182px]"
                to="/register"
                kind="primary"
              >
                Sign up
              </Button>
            </>
          )} */}
          <Button className="w-[100px] lg:w-[182px]" to="/manage/blogs">
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
