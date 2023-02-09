import { Button } from "components/button";
import { Input } from "components/input";
import { Label } from "components/label";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { authRegister } from "store/auth/auth-slice";
import { v4 as uuidv4 } from "uuid";
import { roleUser, statusUser } from "util/constant";

const schema = yup.object({
  name: yup.string().required("Please enter your username"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "The password must be more than 8 characters"),
});

const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    setValue,
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
    document.title = "Register";
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (values) => {
    if (!isValid) return;
    try {
      dispatch(
        authRegister({
          ...values,
          status: statusUser.ACTIVE,
          role: roleUser.USER,
        })
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="px-5 lg:max-w-[600px] mx-auto"
      >
        <div className="mt-[100px] text-center">
          <Link to={"/"} className="inline-block">
            <img src="/logo.png" alt="" />
          </Link>
        </div>
        <div className="flex flex-col gap-5 lg:gap-10 mt-10 lg:mt-[80px]">
          <div className="flex flex-col">
            <Label>Username</Label>
            <Input
              control={control}
              name="name"
              placeholder="Please enter your name"
              className="!p-3 focus:!border-primaryColor"
            ></Input>
          </div>
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
          You already have an account ?{" "}
          <Link to={"/login"} className="text-primaryColor">
            Login
          </Link>
        </p>
        <Button
          isLoading={isSubmitting}
          className="bg-[_linear-gradient(107.61deg,_#83EAF1_15.59%,_#63A4FF_87.25%)] !rounded-lg w-[220px] h-[60px] mx-auto !text-lg"
        >
          Sign Up
        </Button>
      </form>
    </>
  );
};

export default RegisterPage;
