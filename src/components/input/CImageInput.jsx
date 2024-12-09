import React, { useState } from "react";
import { Input } from "react-daisyui";

const CImageInput = ({ label, register, errors, defaultImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    console.log(URL.createObjectURL(file));
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      register.onChange(event);
    } else {
      setSelectedImage(null);
    }
  };

  return (
    <div className="w-full h-auto">
      <label className="font-medium">{label}</label>
      <div className="relative h-auto">
        <Input
          type="file"
          className="absolute inset-0 opacity-0 cursor-pointer"
          {...register}
          onChange={handleImageChange}
        />
        <div
          className={`flex items-center h-auto w-full border rounded-md transition-all duration-300 
                    ${
                      errors
                        ? " placeholder:text-[#FF204E] text-[#FF204E] border-[#FF204E]"
                        : "placeholder:text-gray-400 text-black border-black"
                    } 
                    focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent`}
        >
          <button
            type="button"
            className="px-4 py-3 w-1/2 bg-[#c20250] text-white h-auto rounded-l-md"
          >
            Choose File
          </button>
          <span className="px-4 py-3 h-auto bg-white border-l border-gray-300 w-full">
            {selectedImage ? "File selected" : "No file chosen"}
          </span>
        </div>
      </div>
      {(selectedImage || defaultImage) && (
        <img
          src={selectedImage ?? defaultImage}
          alt="Preview"
          className="mt-2 w-24 h-24 object-cover"
        />
      )}
      {errors && <p className="text-red-500 text-sm">{errors.message}</p>}
    </div>
  );
};

export default CImageInput;
