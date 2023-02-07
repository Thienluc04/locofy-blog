import axios from "axios";
import { Button } from "components/button";
import { Heading } from "components/heading";
import { InputSearch } from "components/input";
import { Status } from "components/status";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { linkAPI, roleUser, statusUser } from "util/constant";
import { v4 as uuid } from "uuid";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import NotFoundPage from "pages/NotFoundPage";

const itemsPerPage = 3;

const UserManage = () => {
  const [dataUsers, setDataUsers] = useState([]);
  let nextPage = 1;

  const [linkData, setLinkData] = useState(
    `${linkAPI}/users?_page=${nextPage}&_limit=${itemsPerPage}`
  );
  const [isReload, setIsReload] = useState();
  const [total, setTotal] = useState();
  const [isLoadMore, setIsLoadmore] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`${linkAPI}/users`);
      setTotal(data.length);
    }

    fetchData();
  }, []);

  const headTypeName = [
    "Id",
    "Fullname",
    "Email",
    "Telephone",
    "Status",
    "Role",
    "Actions",
  ];

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(linkData);
      setIsReload(false);
      if (isReload === false) {
        setDataUsers(data);
      }
    }
    fetchData();
  }, [isReload, linkData]);

  const { user } = useSelector((state) => state.auth);

  const handleDeleteUser = (id) => {
    if (id === user.id) {
      Swal.fire({
        title: "Oops...",
        text: "This user is you! So you can't do this.",
        icon: "error",
        cancelButtonColor: "#d33",
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            method: "delete",
            url: `${linkAPI}/users/${id}`,
          });
          setIsReload(true);
          Swal.fire("Deleted!", "This blog has been deleted.", "success");
        }
      });
    }
  };

  const handleSearchUser = debounce((e) => {
    setLinkData(
      `${linkAPI}/users?username_like=${e.target.value}&_page=${nextPage}&_limit=${itemsPerPage}`
    );
    setIsLoadmore(false);
    if (e.target.value === "") {
      setIsLoadmore(true);
    }
  }, 300);

  const handleLoadMore = async () => {
    if (total > dataUsers?.length) {
      nextPage += 1;
      const { data } = await axios.get(
        `${linkAPI}/users?_page=${nextPage}&_limit=${itemsPerPage}`
      );
      setDataUsers([...dataUsers, ...data]);
    }
  };

  if (
    !user ||
    user?.role === roleUser.MODERATOR ||
    user?.role === roleUser.USER
  )
    return <NotFoundPage></NotFoundPage>;
  return (
    <>
      <div className="flex-1">
        <Heading>All Users</Heading>
        <p className="text-textColor mt-2">Manage all users</p>
        <div className="flex gap-4 items-center justify-end mt-8">
          <Button
            to="/manage/add-user"
            className="text-base !rounded-xl !h-[60px]"
          >
            Add new user
          </Button>

          <InputSearch
            onChange={handleSearchUser}
            placeholder="Search user..."
          ></InputSearch>
        </div>
        <div className="mt-10 rounded-lg">
          <table className="w-full">
            <thead className="bg-[#f7f7f8]">
              <tr>
                {headTypeName.map((item) => (
                  <td key={item} className="px-[30px] py-[20px]">
                    <span className="font-bold">{item}</span>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataUsers?.length <= 0 && (
                <tr className="w-full">
                  <td colSpan={headTypeName.length}>
                    <div className="w-12 h-12 border-4 border-primaryColor border-t-transparent rounded-full animate-spin mx-auto mt-8"></div>
                  </td>
                </tr>
              )}
              {dataUsers?.length > 0 &&
                dataUsers?.map((item) => (
                  <tr key={item.id}>
                    <td className="px-[30px] py-[20px]">{item?.id}</td>
                    <td className="flex items-center gap-3 px-[30px] py-[20px]">
                      <div className="w-[80px] h-[60px] ">
                        <img
                          className="h-full w-full object-cover rounded-lg"
                          src={
                            item?.avatar?.url?.length > 0
                              ? item?.avatar?.url
                              : "/banner.png"
                          }
                          alt=""
                        />
                      </div>
                      <div className="max-w-[200px]">
                        <h1 className="text-base font-primary ">
                          {item?.name}
                        </h1>
                        <p className="text-sm text-gray">Date: 18/10/2022</p>
                      </div>
                    </td>
                    <td title={item?.email} className="px-[30px] py-[20px]">
                      {item?.email?.slice(0, 8) + "..."}
                    </td>
                    <td className="px-[30px] py-[20px]">{item?.telephone}</td>
                    <td className="px-[30px] py-[20px]">
                      {item?.status === statusUser.ACTIVE ? (
                        <Status type={statusUser.ACTIVE}>Active</Status>
                      ) : item?.status === statusUser.PENDING ? (
                        <Status type={statusUser.PENDING}>Pending</Status>
                      ) : item?.status === statusUser.BANNED ? (
                        <Status type={statusUser.BANNED}>Banned</Status>
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="px-[30px] py-[20px]">
                      {item?.role === roleUser.ADMIN
                        ? "Admin"
                        : item?.role === roleUser.MODERATOR
                        ? "Moderator"
                        : item?.role === roleUser.USER
                        ? "User"
                        : ""}
                    </td>
                    <td className="px-[30px] py-[20px]">
                      <div className="flex gap-2">
                        <button className="p-2 cursor-pointer border border-slate-300 text-slate-600  rounded-lg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </button>
                        <Link
                          to={`/manage/update-user/${item.name}`}
                          className="p-2 cursor-pointer border border-slate-300 text-slate-600  rounded-lg"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </Link>
                        <button
                          onClick={() => handleDeleteUser(item.id)}
                          className="p-2 border border-slate-300 text-slate-600  rounded-lg"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {total > dataUsers?.length && isLoadMore && (
            <div className="flex justify-center mt-10">
              <Button onClick={handleLoadMore}>Load more</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserManage;
