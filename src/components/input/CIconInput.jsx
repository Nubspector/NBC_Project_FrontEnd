import React, { useState } from "react";
import { Input } from "react-daisyui";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const CIconInput = ({
    register,
    rightIconActive,
    rightIconInactive,
    leftIcon,
    showRightIcon,
    errors,
    type,
    placeholder,
    label,
    value,
    onChange
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <Input
                    {...register}
                    className={`placeholder:text-sm font-normal placeholder:font-normal transition-all duration-300 ease-in-out
                        ${errors
                            ? "placeholder:text-[#FF204E] text-[#FF204E] border-[#FF204E]"
                            : "placeholder:text-gray-400 text-black border-black"}
                        w-full ${leftIcon ? "pl-10" : ""} ${type === "password" || (rightIconActive || rightIconInactive) ? "pr-12" : ""
                        } 
                        rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent`}
                    placeholder={placeholder}
                    type={type === "password" && showPassword ? "text" : type}
                    value={value}
                    onChange={onChange}
                />
                {leftIcon && (
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500">
                        {leftIcon}
                    </div>
                )}
                {/* Right icon for password toggle */}
                {type === "password" && (
                    <div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 cursor-pointer"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                )}
            </div>
            {errors && (
                <p className="mt-2 text-xs text-[#FF204E]">{errors.message}</p>
            )}
        </div>
    );
};

export default CIconInput;
