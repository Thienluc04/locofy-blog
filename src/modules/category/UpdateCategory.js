import axios from "axios";
import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Heading } from "components/heading";
import { Input } from "components/input";
import { Label } from "components/label";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { linkAPI, statusCategory } from "util/constant";

const UpdateCategory = () => {
  const { slug } = useParams();
  const [categoryId, setCategoryId] = useState();

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
      slug: "",
      status: 1,
    },
  });

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`${linkAPI}/api/categories`);
      data.forEach((item) => {
        if (item.slug === slug) {
          reset(item);
          setCategoryId(item.id);
        }
      });
    }

    fetchData();
  }, [reset, slug]);
  const slugify = require("slugify");

  const UpdateCategoryHandler = (values) => {
    if (values.slug === "") {
      values.slug = slugify(values.name, {
        lower: true,
      });
    } else {
      values.slug = slugify(values.slug, {
        lower: true,
      });
    }
    values.status = Number(values.status);
    axios({
      method: "patch",
      url: `${linkAPI}/api/categories/${categoryId && categoryId}`,
      data: {
        name: values.name,
        slug: values.slug,
        status: values.status,
      },
    });
    toast.success("Update category success!!");
  };

  const watchStatus = watch("status");

  if (!slug) return;

  if (!isValid) return;
  return (
    <>
      <form
        onSubmit={handleSubmit(UpdateCategoryHandler)}
        className="flex-1 flex flex-col"
      >
        <Heading>Update Category</Heading>
        <p className="text-textColor mt-2">Manage upadte category</p>
        <div className="flex flex-col gap-10 mt-10">
          <div className="flex items-center gap-10">
            <div className="flex-1">
              <Label htmlFor="name">Name</Label>
              <Input
                control={control}
                name="name"
                placeholder="Enter your category name"
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
              <Label>Status</Label>
              <div className="flex gap-[20px]">
                <Radio
                  control={control}
                  checked={Number(watchStatus) === statusCategory.APPROVED}
                  name="status"
                  value={statusCategory.APPROVED}
                >
                  Approved
                </Radio>
                <Radio
                  control={control}
                  checked={Number(watchStatus) === statusCategory.UNAPPROVED}
                  name="status"
                  value={statusCategory.UNAPPROVED}
                >
                  Unapproved
                </Radio>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="!rounded-lg !h-[60px] w-[200px] !text-base"
              kind="primary"
              isLoading={isSubmitting}
            >
              Update category
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateCategory;
