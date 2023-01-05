import axios from "axios";
import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Heading } from "components/heading";
import { Input } from "components/input";
import { Label } from "components/label";
import { ImageUpload } from "components/upload";
import NotFoundPage from "pages/NotFoundPage";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { linkAPI, roleUser, statusUser } from "util/constant";

const UpdateUser = () => {
  const { slug } = useParams();

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
      fullname: "",
      username: "",
      email: "",
      telephone: "",
      password: "",
      status: 2,
      role: 3,
      avatar: {},
    },
  });

  const watchStatus = watch("status");
  const watchRole = watch("role");

  const [imgUrl, setImgUrl] = useState(null);
  const [loadingImg, setLoadingImg] = useState(false);
  const [userId, setUserId] = useState();

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
    async function fetchData() {
      const { data } = await axios.get(`${linkAPI}/api/users`);
      data.forEach((item) => {
        if (item.name === slug) {
          reset(item);
          setImgUrl(item.avatar?.url);
          setUserId(item.id);
        }
      });
    }

    fetchData();
  }, [reset, slug]);

  const UpdateUserHandler = (values) => {
    values.role = Number(values.role);
    values.status = Number(values.status);
    console.log(values);
    axios({
      method: "patch",
      url: `${linkAPI}/api/users/${userId && userId}`,
      data: {
        fulllname: values.fullname,
        email: values.email,
        username: values.username,
        telephone: values.telephone,
        password: values.password,
        status: values.status,
        role: values.role,
        avatar: { url: values.avatar.url },
      },
    });
    toast.success("Update user success!!");
  };

  useEffect(() => {
    if (imgUrl != null) {
      setValue("avatar", { url: imgUrl });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgUrl]);

  if (!slug) return <NotFoundPage></NotFoundPage>;

  if (!isValid) return;
  return (
    <>
      <form onSubmit={handleSubmit(UpdateUserHandler)} className="flex-1">
        <Heading>Update User</Heading>
        <p className="text-textColor mt-2">Manage update user</p>
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
              <Label htmlFor="name">User name</Label>
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
              <Label htmlFor="telephone">Mobile phone</Label>
              <Input
                control={control}
                name="telephone"
                type="tel"
                placeholder="Enter your email"
              ></Input>
            </div>
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
                  value={statusUser.PENDING}
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
          </div>
          <div className="flex gap-10">
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

            <div className="flex flex-1"></div>
          </div>
        </div>

        <div className="mt-[60px] flex justify-center">
          <Button
            type="submit"
            className="!rounded-lg !h-[60px] w-[200px] !text-base"
            kind="primary"
            isLoading={isSubmitting}
          >
            Update user
          </Button>
        </div>
      </form>
    </>
  );
};

export default UpdateUser;
