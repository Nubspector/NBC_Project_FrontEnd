import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CInputDatePicker = ({
  label,
  name,
  errors,
  className = "",
  register,
  icon: IconComponent,
  setValue,
  initialValue,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (initialValue) {
      const date = new Date(initialValue);
      if (!isNaN(date)) {
        setSelectedDate(date);
        const formattedDate = date
          .toLocaleDateString("id-ID", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .split("/")
          .reverse()
          .join("-");
        setValue(name, formattedDate);
      }
    }
  }, [initialValue, setValue, name]);

  useEffect(() => {
    if (register) {
      register(name);
    }
  }, [register, name]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date
      ? date
          .toLocaleDateString("id-ID", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .split("/")
          .reverse()
          .join("-")
      : "";
    setValue(name, formattedDate);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative w-full grid">
        <DatePicker
          onChange={handleDateChange}
          selected={selectedDate}
          className={`w-full py-2 pl-10 pr-3 border ${
            errors
              ? "border-[#FF204E] text-[#FF204E]"
              : "border-black text-black"
          } rounded-md placeholder:text-sm placeholder:font-normal
            focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent`}
          dateFormat="dd-MM-yyyy"
          placeholderText="Pilih tanggal"
        />
        {IconComponent && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <IconComponent />
          </span>
        )}
      </div>
      {errors && (
        <p className="mt-2 text-xs text-[#FF204E]">{errors.message}</p>
      )}
    </div>
  );
};

export default CInputDatePicker;
