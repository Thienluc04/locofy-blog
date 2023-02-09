import React from "react";

const ImageUpload = ({
  imgUrl,
  loading,
  removeImage = () => {},
  className = "",
  ...props
}) => {
  return (
    <>
      <div className={`relative group ${className}`}>
        <label
          className={`border border-dashed border-slate-300 rounded-lg w-full h-[250px]
          cursor-pointer flex flex-col justify-center items-center ${className}`}
        >
          <input
            type="file"
            className="absolute overflow-hidden w-0 h-0"
            onChange={() => {}}
            accept=".jpg, .jpeg, .png"
            {...props}
          />
          {imgUrl && (
            <img
              src={imgUrl}
              alt=""
              className={`w-full h-full object-cover ${
                className ? "rounded-full" : "rounded-lg "
              }`}
            />
          )}

          {!imgUrl && !loading && (
            <div>
              <img
                className="max-w-[80px] mb-5 mx-auto"
                src="/img-upload.png"
                alt=""
              />
              <p className="font-semibold">Choose photo</p>
            </div>
          )}
          {loading && (
            <div className="border-4 rounded-full p-4 border-primaryColor border-t-transparent animate-spin"></div>
          )}
        </label>
        {imgUrl && (
          <div
            onClick={removeImage}
            className="cursor-pointer absolute top-2/4 translate-y-[-50%] left-2/4 translate-x-[-50%] z-10 lg:opacity-0 lg:invisible lg:group-hover:opacity-100 lg:group-hover:visible bg-white
                    text-red-500 p-5   rounded-full transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageUpload;
