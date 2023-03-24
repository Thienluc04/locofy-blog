import axios from "api/axios";
import { Button } from "components/button";
import { Heading } from "components/heading";
import { Input } from "components/input";
import { Label } from "components/label";
import { ImageUpload } from "components/upload";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { imgbbAPI, linkAPI } from "util/constant";

const ProfilePage = () => {
  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: "",
  });

  const { user } = useSelector((state) => state.auth);

  const [imgUrl, setImgUrl] = useState(null);
  const [loadingImg, setLoadingImg] = useState(false);

  const handleRemoveImage = (e) => {
    setImgUrl(null);
    setValue("image", "");
  };

  const handleSelectImage = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    setLoadingImg(true);
    const response = await axios({
      method: "post",
      url: imgbbAPI,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.data) {
      setImgUrl(response.data.data.url);
      setLoadingImg(false);
    }
  };

  useEffect(() => {
    if (imgUrl != null) {
      setValue("image", imgUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgUrl]);

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        telephone: user.telephone || "",
        password: user.password,
        birth: user.birth || "",
      });
      setImgUrl(user?.avatar?.url || null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const UpdateProfileHandle = async (values) => {
    if (!isValid) return;
    try {
      await axios({
        method: "patch",
        url: `${linkAPI}/users/${user?.id}`,
        data: {
          name: values.name,
          email: values.email,
          avatar: { url: values.image },
          telephone: values.telephone,
          birth: values.birth,
        },
      });
      toast.success("Update profile success!!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(UpdateProfileHandle)} className="flex-1">
      <Heading className="px-4">Profile user</Heading>
      <div className="flex flex-col gap-5 lg:gap-10 lg:mt-10 mt-5 px-4">
        <div className="flex gap-10">
          <div className="flex flex-1 flex-col gap-[10px]">
            <ImageUpload
              imgUrl={imgUrl}
              loading={loadingImg}
              removeImage={handleRemoveImage}
              onChange={handleSelectImage}
              className="rounded-full w-[200px] !h-[200px] mx-auto"
            ></ImageUpload>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col items-center gap-5 lg:gap-10">
          <div className="flex-1">
            <Label htmlFor="fullname">User name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your username"
              className="w-[350px] lg:w-full"
            ></Input>
          </div>
          <div className="flex-1">
            <Label htmlFor="email">Email</Label>
            <Input
              control={control}
              name="email"
              placeholder="Enter your email"
              className="w-[350px] lg:w-full"
            ></Input>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col items-center gap-5 lg:gap-10">
          <div className="flex-1">
            <Label htmlFor="telephone">Mobile Number</Label>
            <Input
              control={control}
              name="telephone"
              placeholder="Enter your telephone"
              type="tel"
              className="w-[350px] lg:w-full"
            ></Input>
          </div>
          <div className="flex-1">
            <Label htmlFor="password">Birth</Label>
            <Input
              control={control}
              name="birth"
              type="date"
              className="w-[350px] lg:w-full"
            ></Input>
          </div>
        </div>
      </div>
      <div className="mt-10 lg:mt-[60px] flex justify-center">
        <Button
          isLoading={isSubmitting}
          type="submit"
          className="!rounded-lg h-[60px] w-[200px] !text-base"
          kind="primary"
        >
          Update profile
        </Button>
      </div>
    </form>
  );
};

export default ProfilePage;
