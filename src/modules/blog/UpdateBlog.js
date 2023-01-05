import axios from "axios";
import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Dropdown, DropdownList } from "components/dropdown";
import { Heading } from "components/heading";
import { Input } from "components/input";
import { Label } from "components/label";
import { SeekbarToggle } from "components/seekbar";
import { Textarea } from "components/textarea";
import { ImageUpload } from "components/upload";
import NotFoundPage from "pages/NotFoundPage";
import ImageUploader from "quill-image-uploader";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill, { Quill } from "react-quill";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { imgbbAPI, linkAPI, statusBlog } from "util/constant";

Quill.register("modules/imageUploader", ImageUploader);

const UpdateBlog = () => {
  const { slug } = useParams();

  const [content, setContent] = useState("");
  const [listCategory, setListCategory] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await axios.get(`${linkAPI}/api/categories`);
      setListCategory(data);
    }
    fetchCategories();
  }, []);

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
      title: "",
      slug: "",
      status: 2,
      category: {},
      hot: false,
      image: {},
      user: {},
      content: "",
      description: "",
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickOption = (item) => {
    setDropdownName(item);
    setValue("category", { name: item });
  };

  const [dropdownName, setDropdownName] = useState("");
  const [blogId, setBlogId] = useState();

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
    document.title = "Update blog";
  }, []);

  useEffect(() => {
    if (imgUrl != null) {
      setValue("image", imgUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgUrl]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${linkAPI}/api/blogs`);
        data.forEach((item) => {
          if (item.slug === slug) {
            reset({
              title: item.title,
              slug: item.slug,
              image: {
                url: item.image,
              },
              category: {
                name: item.category.name,
                slug: slugify(item.category.name, {
                  lower: true,
                  locale: "vi",
                  strict: true,
                }),
              },
              hot: item.hot,
              status: item.status,
              author: {
                username: "Thienluc",
              },
              description: item.description,
            });
            setContent(item.content);
            handleClickOption(item.category.name);
            setImgUrl(item.image.url);
            setBlogId(item.id);
          }
        });
      } catch (error) {
        throw new Error(error);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, slug]);

  const UpdateBlogHandler = async (values) => {
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
    values.content = content;

    try {
      await axios({
        method: "patch",
        url: `${linkAPI}/api/blogs/${blogId && blogId}`,
        data: {
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
            }),
          },
          hot: values.hot,
          status: values.status,
          description: values.description,
        },
      });
      toast.success("Update blog successfully!!");
    } catch (error) {
      console.log(error);
    }
  };

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

  if (!slug) return <NotFoundPage></NotFoundPage>;

  if (!isValid) return;
  return (
    <form onSubmit={handleSubmit(UpdateBlogHandler)} className="flex-1">
      <Heading>Update blog</Heading>
      <p className="text-textColor mt-2">Manage update blog</p>
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
          Update blog
        </Button>
      </div>
    </form>
  );
};

export default UpdateBlog;
