import { getAuth, onAuthStateChanged } from "firebase/auth";
import Footer from "modules/home/Footer";
import Header from "modules/home/Header";
import Sidebar from "modules/manage/Sidebar";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = ({ allowPermission }) => {
  const navigate = useNavigate();

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user || !user.displayName) {
        navigate("/");
        return;
      }
    });
  }, [auth, navigate]);

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
