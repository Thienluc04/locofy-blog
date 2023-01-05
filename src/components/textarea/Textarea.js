import React from "react";
import { useController } from "react-hook-form";

const Textarea = ({ name, control, children, ...props }) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  return (
    <textarea
      className="border border-slate-300 h-[200px] p-3 resize-none rounded-lg"
      {...field}
      {...props}
    >
      {children}
    </textarea>
  );
};

export default Textarea;
