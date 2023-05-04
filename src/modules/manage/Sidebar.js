import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authLogOut } from "store/auth/auth-slice";
import { roleUser } from "util/constant";

const Sidebar = () => {
  const sidebarLinks = [
    {
      title: "Blog",
      url: "manage/blogs",
      icon: (
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
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
        </span>
      ),
    },
    {
      title: "Category",
      url: "manage/categories",
      icon: (
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
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
        </span>
      ),
    },
    {
      title: "Logout",
      icon: (
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
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </span>
      ),

      onClick: () => {},
    },
  ];

  const auth = getAuth();

  return (
    <div
      className="flex flex-col gap-4 w-[300px]  rounded-lg 
      shadow-[10px_10px_20px_rgb(218_213_213_/_15%)] "
    >
      {sidebarLinks.map((item) => {
        if (item.onClick) {
          return (
            <div
              onClick={() => {
                signOut(auth);
              }}
              key={item.title}
              className="flex gap-4 py-4 px-6 cursor-pointer text-textColor hover:bg-[#457dff6e] hover:text-primaryColor  transition-all"
              to={item.url}
            >
              {item.icon}
              {item.title}
            </div>
          );
        } else {
          return (
            <NavLink
              key={item.title}
              className="sidebar-item flex gap-4 py-4 px-6 text-textColor hover:bg-[#457dff1c] hover:text-primaryColor  transition-all "
              to={item.url}
            >
              {item.icon}
              {item.title}
            </NavLink>
          );
        }
      })}
    </div>
  );
};

export default Sidebar;
