import axios from "axios";
import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Dropdown, DropdownList } from "components/dropdown";
import { Heading } from "components/heading";
import { Input } from "components/input";
import { Label } from "components/label";
import { SeekbarToggle } from "components/seekbar";
import { ImageUpload } from "components/upload";
import ImageUploader from "quill-image-uploader";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { imgbbAPI, linkAPI, statusBlog } from "util/constant";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import { Textarea } from "components/textarea";
import { useSelector } from "react-redux";

Quill.register("modules/imageUploader", ImageUploader);

const AddBlog = () => {
  const [content, setContent] = useState("");
  const [listCategory, setListCategory] = useState([]);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await axios.get(`${linkAPI}/api/categories`);
      setListCategory(data);
    }
    fetchCategories();
  }, []);

  const createdAt =
    new Date().getDate() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getFullYear();

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      category: {},
      hot: false,
      image: "",
      user: {},
      content: "",
      description: "",
    },
  });
  const slugify = require("slugify");

  const AddBlogHandler = async (values) => {
    values.content = content;
    if (values.slug === "") {
      values.slug = slugify(values.title, {
        lower: true,
      });
    } else {
      values.slug = slugify(values.slug, {
        lower: true,
      });
    }
    values.status = Number(values.status);
    try {
      await axios({
        method: "post",
        url: `${linkAPI}/api/blogs`,
        data: {
          id: uuidv4(),
          title: values.title,
          slug: values.slug,
          image: {
            url: values.image,
          },
          content: values.content,
          category: {
            name: values.category.name,
            slug: slugify(values.category.name, {
              lower: true,
              locale: "vi",
              strict: true,
            }),
          },
          hot: values.hot,
          status: values.status,
          author: {
            id: /* user.id  ||*/ uuidv4(),
            name: /* user.name || */ "Thienluc",
            avatar: /* user.avatar.url || */ "/banner.png",
          },
          description: values.description,
          createdAt: createdAt,
        },
      });
      toast.success("Add new blog success!!");
      reset({
        title: "",
        slug: "",
        status: 2,
        category: null,
        hot: false,
        image: "",
        user: {},
        content: "",
        description: "",
      });
      setContent("");
      setImgUrl(null);
      setValue("image", "");
      setDropdownName("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOption = (item) => {
    setDropdownName(item);
    setValue("category", { name: item });
  };

  const [dropdownName, setDropdownName] = useState("");

  const watchStatus = watch("status");
  const watchHot = watch("hot");

  const [imgUrl, setImgUrl] = useState(null);
  const [loadingImg, setLoadingImg] = useState(false);

  const handleRemoveImage = (e) => {
    setImgUrl(null);
    setValue("image", "");
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
    document.title = "Add new blog";
  }, []);

  useEffect(() => {
    if (imgUrl != null) {
      setValue("image", imgUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgUrl]);

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: imgbbAPI,
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );
  if (!isValid) return;
  return (
    <form onSubmit={handleSubmit(AddBlogHandler)} className="flex-1">
      <Heading>Add new blog</Heading>
      <p className="text-textColor mt-2">Manage all blogs</p>
      <div className="flex flex-col gap-10 mt-10">
        <div className="flex items-center gap-10">
          <div className="flex-1">
            <Label htmlFor="title">Title</Label>
            <Input
              control={control}
              name="title"
              placeholder="Enter your title"
            ></Input>
          </div>
          <div className="flex-1">
            <Label htmlFor="slug">Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-1 flex-col gap-[10px]">
            <Label>Image</Label>
            <ImageUpload
              imgUrl={imgUrl}
              loading={loadingImg}
              removeImage={handleRemoveImage}
              onChange={handleSelectImage}
            ></ImageUpload>
          </div>
          <div className="flex-1">
            <Label>Category</Label>
            <Dropdown list={listCategory}>
              <DropdownList
                onClick={(item) => handleClickOption(item)}
                dropdownName={dropdownName}
                list={listCategory}
              ></DropdownList>
            </Dropdown>
            {dropdownName && (
              <div className="mt-6">
                <span className="text-primaryColor bg-blue-100 p-3 text-center rounded-lg">
                  {dropdownName}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <Label>Content</Label>
          <div className="w-full entry-content">
            <ReactQuill
              modules={modules}
              theme="snow"
              value={content}
              onChange={setContent}
            ></ReactQuill>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col gap-[10px] flex-1">
            <Label htmlFor="description">Description</Label>
            <Textarea control={control} name="description"></Textarea>
          </div>
          <div className="flex flex-1 flex-col gap-[10px]">
            <Label>Status</Label>
            <div className="flex gap-[20px]">
              <Radio
                control={control}
                checked={Number(watchStatus) === statusBlog.APPROVED}
                name="status"
                value={statusBlog.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                control={control}
                checked={Number(watchStatus) === statusBlog.PENDING}
                name="status"
                value={statusBlog.PENDING}
              >
                Pending
              </Radio>
              <Radio
                control={control}
                checked={Number(watchStatus) === statusBlog.REJECT}
                name="status"
                value={statusBlog.REJECT}
              >
                Reject
              </Radio>
            </div>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-1 flex-col gap-[10px]">
            <Label>Feature post</Label>
            <SeekbarToggle
              control={control}
              name="hot"
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></SeekbarToggle>
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
          Add new blog
        </Button>
      </div>
    </form>
  );
};

export default AddBlog;
