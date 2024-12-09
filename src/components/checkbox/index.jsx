import React, { forwardRef } from "react";
// import ValidationError from "components/validation/error";

const CCheckboxInner = (props, ref) => {
  return (
    <div className="flex items-start w-full">
      <input
        {...props}
        type="checkbox"
        ref={ref}
        className={`size-5 rounded-md border-gray-200 bg-white shadow-sm ${
          props?.error ? "!border-red-400" : ""
        }`}
      />
      {props.label && (
        <span className="ml-2 text-sm text-gray-700">{props.label}</span>
      )}
      {/* <ValidationError error={props?.error} /> */}
    </div>
  );
};

const CheckBox = forwardRef(CCheckboxInner);

export default CheckBox;
