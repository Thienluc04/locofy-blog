import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Input } from "components/input";
import { Label } from "components/label";
import React from "react";
import { useForm } from "react-hook-form";
import { linkAPI, statusCategory } from "util/constant";
import "react-quill/dist/quill.snow.css";
import { Heading } from "components/heading";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const AddCategory = () => {
  const linkData = `${linkAPI}/categories`;

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

  const slugify = require("slugify");
  const watchStatus = watch("status");

  const AddCategoryHandler = (values) => {
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
      method: "post",
      url: linkData,
      data: {
        id: uuidv4(),
        name: values.name,
        slug: values.slug,
        status: values.status,
      },
    });
    toast.success("Add new user success!!");
    reset({
      name: "",
      slug: "",
      status: 1,
    });
  };

  if (!isValid) return;
  return (
    <>
      <form
        onSubmit={handleSubmit(AddCategoryHandler)}
        className="flex-1 flex flex-col"
      >
        <Heading>All Categories</Heading>
        <p className="text-textColor mt-2">Manage all categories</p>
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
              Add new category
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddCategory;
