import React from "react";
import { Button as DaisyButton } from "react-daisyui";

const CButton = ({ label, type, variant, onClick, loading = false }) => {
    const buttonClasses = variant === "filled"
        ? "bg-[#f30b6a] hover:bg-[#c20250] text-white hover:scale-105 hover:shadow-xl active:bg-[#c20250]"
        : "border border-current text-indigo-600 hover:scale-105 hover:shadow-xl active:text-indigo-500";

    return (
        <DaisyButton
            className={`flex w-full justify-center items-center hover:cursor-pointer rounded px-6 py-3 text-sm font-medium transition focus:outline-none focus:ring ${buttonClasses}`}
            onClick={onClick}
            type={type}
            variant={variant}
            disabled={loading}
            loading={loading}
        >
            {loading && (
                <span className="ml-2">{label}</span>
            )}
            {!loading && (
                <span>{label}</span>
            )}
        </DaisyButton>
    );
};

export default CButton;
