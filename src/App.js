import { Route, Routes } from "react-router-dom";
import AddBlog from "modules/blog/AddBlog";
import AddCategory from "modules/category/AddCategory";
import AllBlog from "modules/blog/AllBlog";
import ArticlePage from "pages/ArticlePage";
import AuthorPage from "pages/AuthorPage";
import BlogManage from "modules/blog/BlogManage";
import CategoryManage from "modules/category/CategoryManage";
import CategoryPage from "pages/CategoryPage";
import DashboardLayout from "layout/DashboardLayout";
import HomeLayout from "layout/HomeLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "pages/LoginPage";
import NotFoundPage from "pages/NotFoundPage";
import RegisterPage from "pages/RegisterPage";
import UpdateBlog from "modules/blog/UpdateBlog";
import UpdateCategory from "modules/category/UpdateCategory";
import firebase from "firebase/compat/app";

const App = () => {
  // const { user } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (user && user.id) {
  //     const { access_token } = getToken();
  //     dispatch(
  //       authUpdateUser({
  //         user: user,
  //         accessToken: access_token,
  //       })
  //     );
  //   } else {
  //     const { refresh_token } = getToken();
  //     if (refresh_token) {
  //       dispatch(authRefreshToken(refresh_token));
  //     } else {
  //       dispatch(authUpdateUser({}));
  //       logOut();
  //     }
  //   }
  // }, [dispatch, user]);

  const config = {
    apiKey: "AIzaSyBZbh9a1xjaBbMI025_MDM27SALB5lUjCs",
    authDomain: "locofy-blog.firebaseapp.com",
  };
  firebase.initializeApp(config);

  return (
    <Routes>
      <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
      <Route element={<HomeLayout></HomeLayout>}>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/:slug" element={<ArticlePage></ArticlePage>}></Route>
      </Route>
      <Route element={<DashboardLayout></DashboardLayout>}>
        <Route path="manage/blogs" element={<BlogManage></BlogManage>}></Route>
        {/* <Route path="manage/users" element={<UserManage></UserManage>}></Route> */}
        <Route
          path="manage/categories"
          element={<CategoryManage></CategoryManage>}
        ></Route>

        <Route path="manage/add-blog" element={<AddBlog></AddBlog>}></Route>
        {/* <Route path="manage/add-user" element={<AddUser></AddUser>}></Route> */}
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
        {/* <Route
          path="manage/update-user/:slug"
          element={<UpdateUser></UpdateUser>}
          O
        ></Route> */}
        {/* <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route> */}
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
