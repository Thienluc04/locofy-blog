import { Button } from "components/button";
import { Input } from "components/input";
import { Label } from "components/label";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "store/auth/auth-slice";
import { linkAPI, statusUser } from "util/constant";
import axios from "api/axios";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "The password must be more than 8 characters"),
});

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const [passwordShow, setPasswordShow] = useState(false);
  const handleTogglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  useEffect(() => {
    const errorMessage = Object.values(errors);
    toast.error(errorMessage[0]?.message);
  }, [errors]);

  useEffect(() => {
    document.title = "Login";
  }, []);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user?.email) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSignIn = async (values) => {
    if (!isValid) return;

    const { data } = await axios.get(`${linkAPI}/users`);
    let userCheck = {};
    data.forEach((item) => {
      if (item.email === values.email) {
        userCheck = item;
      }
    });
    if (userCheck.status === statusUser.ACTIVE) {
      try {
        dispatch(authLogin(values));
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("The account just entered is not activated!");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="px-5 lg:max-w-[600px] mx-auto"
      >
        <div className="mt-[100px] text-center">
          <Link to={"/"} className="inline-block">
            <img src="/logo.png" alt="" />
          </Link>
        </div>
        <div className="flex flex-col gap-5 lg:gap-10 mt-10 lg:mt-[80px]">
          <div className="flex flex-col">
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              placeholder="Please enter your email"
              className="!p-3 focus:!border-primaryColor"
            ></Input>
          </div>
          <div className="flex flex-col">
            <Label>Password</Label>
            <Input
              eye
              passwordType={passwordShow}
              handleClickEye={handleTogglePassword}
              control={control}
              name="password"
              type={passwordShow ? "text" : "password"}
              placeholder="Please enter your password"
              className="!p-3 focus:!border-primaryColor"
            ></Input>
          </div>
        </div>
        <p className="my-4">
          You have not had an account ?{" "}
          <Link to={"/register"} className="text-primaryColor">
            Register
          </Link>
        </p>
        <Button
          isLoading={isSubmitting}
          className="bg-[_linear-gradient(107.61deg,_#83EAF1_15.59%,_#63A4FF_87.25%)] !rounded-lg w-[220px] h-[60px] mx-auto !text-lg"
        >
          Sign In
        </Button>
      </form>
    </>
  );
};

export default LoginPage;
