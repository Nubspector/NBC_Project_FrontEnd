import React, { useEffect, useState } from "react";
import {
  FaCalendar,
  FaCalendarAlt,
  FaCalendarCheck,
  FaDollarSign,
  FaList,
} from "react-icons/fa";
import { MdSpa } from "react-icons/md";
import { RiDiscountPercentFill } from "react-icons/ri";
import CIconInput from "../../input/CIconInput";
import CInputDatePicker from "../../date/CInputDatePicker";
import { Button, Modal } from "react-daisyui";
import usePromos from "../../../hooks/promo/usePromoForm";

export default function UpsertModalPromo({ isOpen, type, handler, id }) {
  const {
    register,
    handleSubmit,
    errors,
    watch,
    success,
    getValues,
    setValue,
  } = usePromos(type, id);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (success) {
      handler(true);
    }
  }, [success]);

  return (
    <Modal
      open={isOpen}
      backdrop={false}
      className="flex flex-col bg-white lg:min-w-[900px] h-[650px] p-5 rounded-lg overflow-scroll"
    >
      <form onSubmit={handleSubmit}>
        <Modal.Body className="flex flex-col justify-start items-start">
          <p className="text-xl font-semibold text-start">
            {type === "create" ? "Form Create" : "Edit"} Promo
          </p>
          <div className="grid grid-cols-2 w-full gap-5">
            <div className="flex flex-col gap-2 w-full pt-4">
              <CIconInput
                label={"Nama Promo"}
                leftIcon={<MdSpa className="w-4 h-4 cursor-pointer" />}
                type="text"
                placeholder="Enter name"
                register={register("name")}
                name="name"
                errors={errors.name}
              />
            </div>
            <div className="flex flex-col gap-2 w-full pt-4">
              <CIconInput
                label={"Deskripsi"}
                leftIcon={<FaList className="w-4 h-4 cursor-pointer" />}
                type="text"
                placeholder="Enter description"
                register={register("description")}
                name="description"
                errors={errors.description}
              />
            </div>
            <div className="flex flex-col gap-2 w-full pt-4">
              <CIconInput
                label={"Diskon "}
                leftIcon={<FaDollarSign className="w-4 h-4 cursor-pointer" />}
                type="number"
                placeholder="Enter discount"
                register={register("discount")}
                name="discount"
                errors={errors.discount}
              />
            </div>
            <div className="flex flex-col gap-2 w-full pt-4">
              <CInputDatePicker
                label="Start Date"
                register={register}
                name={'start_date'}
                errors={errors.start_date}
                icon={FaCalendarAlt}
                setValue={setValue}
                initialValue={getValues("start_date")}
              />
            </div>
            <div className="flex flex-col gap-2 w-full pt-4">
              <CInputDatePicker
                label="End Date"
                register={register}
                name={'end_date'}
                errors={errors.end_date}
                icon={FaCalendarCheck}
                setValue={setValue}
                initialValue={getValues("end_date")}
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.Actions className="flex w-full justify-end items-center mt-16 space-x-3">
          <Button
            className="w-[30%] lg:w-[10%] p-2 rounded-xl bg-gray-500 text-white hover:bg-gray-800 hover:border-[#3A3B3C] hover:text-white"
            type="button"
            onClick={() => handler(false)}
          >
            Keluar
          </Button>
          <Button
            type="submit"
            className="w-[30%] lg:w-[10%] p-2 rounded-xl bg-[#f30b6a] hover:bg-[#c20250] text-white"
            loading={loading}
          >
            Simpan
          </Button>
        </Modal.Actions>
      </form>
    </Modal>
  );
}
