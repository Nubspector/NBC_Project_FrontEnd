import React from "react";

const CSelectInput = ({ label, name, register, options, errors, placeholder }) => {
    return (
        <div className="">
            <label className="text-sm font-semibold">{label}</label>
            <select
                {...register(name)}
                className={`select select-bordered border-black w-full transition-all duration-300 
                ${errors ? "border-red-500" : "border-black"} 
                focus:ring-1 focus:ring-black focus:border-transparent rounded-md`}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {errors && <p className="text-red-500 text-xs">{errors.message}</p>}
        </div>
    );
};

export default CSelectInput;
