import DashboardLayout from "layout/DashboardLayout";
import HomeLayout from "layout/HomeLayout";
import AddBlog from "modules/blog/AddBlog";
import AllBlog from "modules/blog/AllBlog";
import BlogManage from "modules/blog/BlogManage";
import UpdateBlog from "modules/blog/UpdateBlog";
import AddCategory from "modules/category/AddCategory";
import CategoryManage from "modules/category/CategoryManage";
import UpdateCategory from "modules/category/UpdateCategory";
import AddUser from "modules/user/AddUser";
import UpdateUser from "modules/user/UpdateUser";
import UserManage from "modules/user/UserManage";
import ArticlePage from "pages/ArticlePage";
import AuthorPage from "pages/AuthorPage";
import CategoryPage from "pages/CategoryPage";
import LoginPage from "pages/LoginPage";
import NotFoundPage from "pages/NotFoundPage";
import ProfilePage from "pages/ProfilePage";
import RegisterPage from "pages/RegisterPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { authRefreshToken, authUpdateUser } from "store/auth/auth-slice";
import { getToken, logOut } from "util/auth";
import HomePage from "./pages/HomePage";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.id) {
      const { access_token } = getToken();
      dispatch(
        authUpdateUser({
          user: user,
          accessToken: access_token,
        })
      );
    } else {
      const { refresh_token } = getToken();
      if (refresh_token) {
        dispatch(authRefreshToken(refresh_token));
      } else {
        dispatch(authUpdateUser({}));
        logOut();
      }
    }
  }, [dispatch, user]);

  return (
    <Routes>
      <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
      <Route element={<HomeLayout></HomeLayout>}>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/:slug" element={<ArticlePage></ArticlePage>}></Route>
      </Route>
      <Route element={<DashboardLayout></DashboardLayout>}>
        <Route path="manage/blogs" element={<BlogManage></BlogManage>}></Route>
        <Route path="manage/users" element={<UserManage></UserManage>}></Route>
        <Route
          path="manage/categories"
          element={<CategoryManage></CategoryManage>}
        ></Route>

        <Route path="manage/add-blog" element={<AddBlog></AddBlog>}></Route>
        <Route path="manage/add-user" element={<AddUser></AddUser>}></Route>
        <Route
          path="manage/add-category"
          element={<AddCategory></AddCategory>}
        ></Route>
        <Route
          path="manage/update-blog/:slug"
          element={<UpdateBlog></UpdateBlog>}
        ></Route>
        <Route
          path="manage/update-category/:slug"
          element={<UpdateCategory></UpdateCategory>}
        ></Route>
        <Route
          path="manage/update-user/:slug"
          element={<UpdateUser></UpdateUser>}
        ></Route>
        <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
      </Route>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
      <Route path="/blogs" element={<AllBlog></AllBlog>}></Route>
      <Route
        path="/category/:slug"
        element={<CategoryPage></CategoryPage>}
      ></Route>
      <Route path="/author/:slug" element={<AuthorPage></AuthorPage>}></Route>
    </Routes>
  );
};

export default App;
