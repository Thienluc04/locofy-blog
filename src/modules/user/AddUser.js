import axios from "axios";
import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Heading } from "components/heading";
import { Input } from "components/input";
import { Label } from "components/label";
import { ImageUpload } from "components/upload";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { authRegister } from "store/auth/auth-slice";
import { linkAPI, roleUser, statusUser } from "util/constant";
import { v4 as uuidv4 } from "uuid";

const AddUser = () => {
  const linkData = `${linkAPI}/users`;

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      telephone: "",
      password: "",
      status: 2,
      role: 3,
      avatar: {},
    },
  });

  const dispatch = useDispatch();

  const AddUserHandler = async (values) => {
    values.status = Number(values.status);
    values.role = Number(values.role);

    try {
      await dispatch(
        authRegister({
          ...values,
        })
      );
      reset({
        name: "",
        email: "",
        telephone: "",
        password: "",
        status: 2,
        role: 3,
        avatar: {},
      });
      setImgUrl(null);
      setValue("avatar", {});
    } catch (error) {
      console.log(error);
    }
  };

  const watchStatus = watch("status");
  const watchRole = watch("role");

  const [imgUrl, setImgUrl] = useState(null);
  const [loadingImg, setLoadingImg] = useState(false);

  const [passwordShow, setPasswordShow] = useState(false);
  const handleTogglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  const handleRemoveImage = (e) => {
    setImgUrl(null);
    setValue("avatar", "");
  };

  const handleSelectImage = (e) => {
    const reader = new FileReader();
    reader.onloadstart = (e) => {
      setLoadingImg(true);
    };
    reader.onload = (e) => {
      setImgUrl(e.target.result);
    };
    reader.onloadend = (e) => {
      setLoadingImg(false);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (imgUrl != null) {
      setValue("avatar", { url: imgUrl });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgUrl]);

  if (!isValid) return;
  return (
    <>
      <form onSubmit={handleSubmit(AddUserHandler)} className="flex-1">
        <Heading>All Users</Heading>
        <p className="text-textColor mt-2">Manage all users</p>
        <div className="flex flex-col gap-10 mt-10">
          <div className="w-[200px] rounded-full mx-auto">
            <ImageUpload
              imgUrl={imgUrl}
              loading={loadingImg}
              removeImage={handleRemoveImage}
              onChange={handleSelectImage}
              className="rounded-full !h-[200px]"
            ></ImageUpload>
          </div>

          <div className="flex items-center gap-10">
            <div className="flex-1">
              <Label htmlFor="name">Username</Label>
              <Input
                control={control}
                name="name"
                placeholder="Enter your username"
              ></Input>
            </div>
            <div className="flex-1">
              <Label htmlFor="email">Email</Label>
              <Input
                control={control}
                name="email"
                type="email"
                placeholder="Enter your email"
              ></Input>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex-1">
              <Label htmlFor="password">Password</Label>
              <Input
                eye
                passwordType={passwordShow}
                handleClickEye={handleTogglePassword}
                control={control}
                name="password"
                type={passwordShow ? "text" : "password"}
                placeholder="Please enter your password"
              ></Input>
            </div>
            <div className="flex-1">
              <Label htmlFor="telephone">Mobile number</Label>
              <Input
                control={control}
                name="telephone"
                type="tel"
                placeholder="Enter your telephone"
              ></Input>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-1 flex-col gap-[10px]">
              <Label>Status</Label>
              <div className="flex gap-[20px]">
                <Radio
                  control={control}
                  checked={Number(watchStatus) === statusUser.ACTIVE}
                  name="status"
                  value={statusUser.ACTIVE}
                >
                  Active
                </Radio>
                <Radio
                  control={control}
                  checked={Number(watchStatus) === statusUser.PENDING}
                  name="status"
                  value={statusUser.PEDING}
                >
                  Pending
                </Radio>
                <Radio
                  control={control}
                  checked={Number(watchStatus) === statusUser.BANNED}
                  name="status"
                  value={statusUser.BANNED}
                >
                  Banned
                </Radio>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-[10px]">
              <Label>Role</Label>
              <div className="flex gap-[20px]">
                <Radio
                  control={control}
                  checked={Number(watchRole) === roleUser.ADMIN}
                  name="role"
                  value={roleUser.ADMIN}
                >
                  Admin
                </Radio>
                <Radio
                  control={control}
                  checked={Number(watchRole) === roleUser.MODERATOR}
                  name="role"
                  value={roleUser.MODERATOR}
                >
                  Moderator
                </Radio>
                <Radio
                  control={control}
                  checked={Number(watchRole) === roleUser.USER}
                  name="role"
                  value={roleUser.USER}
                >
                  User
                </Radio>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[60px] flex justify-center">
          <Button
            type="submit"
            className="!rounded-lg !h-[60px] w-[200px] !text-base"
            kind="primary"
            isLoading={isSubmitting}
          >
            Add new user
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddUser;
