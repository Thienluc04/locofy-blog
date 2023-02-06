import Footer from "modules/home/Footer";
import Header from "modules/home/Header";
import Sidebar from "modules/manage/Sidebar";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = ({ allowPermission }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user]);

  return (
    <div className="bg-primary">
      <Header></Header>
      <div className="flex my-10 gap-10 max-w-[1600px] mx-auto">
        <span className="hidden lg:block">
          <Sidebar></Sidebar>
        </span>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;
