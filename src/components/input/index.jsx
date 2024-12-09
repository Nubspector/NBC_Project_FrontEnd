import React, { forwardRef } from "react";
import { Input } from "react-daisyui";

const CInputInner = ({ label, error, ...props }, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <Input
                {...props}
                ref={ref}
                className={`placeholder:text-sm font-semibold placeholder:font-normal transition-all duration-300 ease-in-out w-full
                    ${error ? "border-red-400" : "border-gray-300"} 
                    focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent
                    bg-white text-gray-700 placeholder-gray-400 hover:shadow-lg border-black`}
            />
        </div>
    );
};

const CInput = forwardRef(CInputInner);

export default CInput;
