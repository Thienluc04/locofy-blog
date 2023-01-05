import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  children,
  className = "",
  kind = "primary",
  isLoading = false,
  onClick = () => {},
  ...props
}) => {
  const { to } = props;

  const child = isLoading ? (
    <span className="w-[30px] h-[30px] block border-[3px] rounded-full border-t-transparent border-white animate-spin"></span>
  ) : (
    children
  );

  switch (kind) {
    case "primary":
      if (to) {
        return (
          <Link
            to={to}
            className={`w-[182px] h-[46px] rounded-3xl font-fontCategory bg-primaryColor 
          flex justify-center items-center text-white  text-sm ${className}`}
            {...props}
          >
            {child}
          </Link>
        );
      } else {
        return (
          <button
            className={`w-[182px] h-[46px] rounded-3xl font-fontCategory bg-primaryColor 
          flex justify-center items-center text-white  text-sm ${className}`}
            onClick={onClick}
            {...props}
          >
            {child}
          </button>
        );
      }
    case "outline": {
      if (to) {
        return (
          <Link
            to={to}
            className={` h-[46px] rounded-3xl font-fontCategory w-[160px] gap-1 bg-white 
          flex justify-center items-center text-primaryColor text-base border border-primaryColor
          ${className}`}
            {...props}
          >
            {child}
          </Link>
        );
      } else {
        return (
          <button
            className={` h-[46px] rounded-3xl font-fontCategory w-[160px] gap-1 bg-white 
          flex justify-center items-center text-primaryColor text-base border border-primaryColor
          ${className}`}
            onClick={onClick}
            {...props}
          >
            {children}
          </button>
        );
      }
    }

    default:
      break;
  }

  return <button className={className}>{child}</button>;
};

export default Button;
