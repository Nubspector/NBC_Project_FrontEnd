import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-daisyui";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";
import useCustomer from "../../../hooks/customer/useCustomerForm";
import useFetchDoctor from "../../../hooks/select/useFetchDoctor";
import useFetchRoom from "../../../hooks/select/useFetchRoom";
import useTransaction from "../../../hooks/transaction/useTransactionForm";
import CInputDatePicker from "../../date/CInputDatePicker";
import useFetchBeautician from "../../../hooks/select/useFetchBeautician";
import useFetchTreatment from "../../../hooks/select/useFetchTreatment";
import { useFieldArray } from "react-hook-form";
import { MinusIcon } from "@heroicons/react/24/solid";

const CSTransactionModal = ({ isOpen, onClose, id }) => {
  const { selectedCustomer } = useCustomer("transaction", id, "transaction");
  const [isConsultation, setIsConsultation] = useState(null);
  const { doctor } = useFetchDoctor();
  const { room } = useFetchRoom();
  const { beautician } = useFetchBeautician();
  const { treatment } = useFetchTreatment();

  const {
    errors,
    register,
    getValues,
    setValue,
    handleSubmit,
    success,
    setSuccess,
    reset,
    control,
  } = useTransaction(isConsultation ? "consultation" : "non-consultation", id);

  const {
    fields: treatmentFields,
    append: appendTreatment,
    remove: removeTreatment,
  } = useFieldArray({
    control,
    name: "treatment_ids",
  });

  const handleConsultationToggle = (isConsulting) => {
    setIsConsultation(isConsulting);
    reset();
  };

  useEffect(() => {
    if (success) {
      setIsConsultation(null);
      setSuccess(false);
      onClose();
    }
  }, [success, setSuccess, onClose]);

  return (
    <Modal
      open={isOpen}
      backdrop={false}
      className="flex flex-col bg-white lg:min-w-[900px] h-[650px] p-5 rounded-lg overflow-scroll"
    >
      <form onSubmit={handleSubmit}>
        <Modal.Body className="text-start text-sm font-medium w-full">
          <p className="text-3xl font-semibold text-start">
            Transaction Customer
          </p>
          <div className="flex items-center space-x-2">
            <p className="text-lg font-normal text-start">
              {selectedCustomer?.name}
            </p>
            <span>/</span>
            <p className="text-lg font-normal text-gray-400 text-start">
              {selectedCustomer?.card_id}
            </p>
          </div>

          <div className="flex justify-start mt-4 mb-1 space-x-4">
            <Button
              type="button"
              onClick={() => handleConsultationToggle(true)}
              className={`px-4 py-2 rounded-full ${
                isConsultation
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Consultation
            </Button>
            <Button
              type="button"
              onClick={() => handleConsultationToggle(false)}
              className={`px-4 py-2 rounded-full ${
                isConsultation === false
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              No Consultation
            </Button>
          </div>

          {isConsultation === true && (
            <div className="grid grid-cols-2 w-full gap-5">
              <div className="flex flex-col w-full pt-4">
                <label>Pilih Doctor</label>
                <select
                  {...register("doctor_id")}
                  className="select select-bordered border-black w-full transition-all duration-300"
                >
                  <option value="">Pilih Doctor</option>
                  {doctor.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name}
                    </option>
                  ))}
                </select>
                {errors.doctor_id && (
                  <p className="text-red-500 mt-2 text-xs">
                    {errors.doctor_id.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full pt-4">
                <label>Pilih Room</label>
                <select
                  {...register("room_id")}
                  className="select select-bordered border-black w-full transition-all duration-300"
                >
                  <option value="">Pilih Room</option>
                  {room.map((rm) => (
                    <option key={rm.id} value={rm.id}>
                      {rm.name}
                    </option>
                  ))}
                </select>
                {errors.room_id && (
                  <p className="text-red-500 mt-2 text-xs">
                    {errors.room_id.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full pt-4">
                <CInputDatePicker
                  label="Tanggal Konsultasi"
                  register={register}
                  errors={errors.consultation_date}
                  name={"consultation_date"}
                  setValue={setValue}
                  initialValue={getValues("consultation_date")}
                  icon={FaCalendarAlt}
                />
              </div>
            </div>
          )}

          {isConsultation === false && (
            <div className="grid grid-cols-2 w-full gap-5">
              <div className="w-full col-span-2 mt-4">
                <label className="text-gray-700 font-medium mb-2 block">
                  Treatments
                </label>
                <div className="grid gap-5">
                  {treatmentFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center space-x-4 mb-4"
                    >
                      <select
                        {...register(`treatment_ids.${index}.id`)}
                        className="select select-bordered w-full transition-all duration-300 border-black focus:ring-1 focus:ring-black focus:border-transparent rounded-md"
                      >
                        <option value="">Select Treatment</option>
                        {treatment.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => removeTreatment(index)}
                        className="text-red-600 p-2 hover:bg-red-200 rounded-full"
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => appendTreatment({ id: "" })}
                  className="flex items-center mt-3 font-medium text-green-600 hover:text-green-700 transition"
                >
                  <FaPlus className="mr-1" /> Add Treatment
                </button>
              </div>
              <div className="flex flex-col w-full pt-4">
                <label>Pilih Room</label>
                <select
                  {...register("room_id")}
                  className="select select-bordered border-black w-full transition-all duration-300"
                >
                  <option value="">Pilih Room</option>
                  {room.map((rm) => (
                    <option key={rm.id} value={rm.id}>
                      {rm.name}
                    </option>
                  ))}
                </select>
                {errors.room_id && (
                  <p className="text-red-500 mt-2 text-xs">
                    {errors.room_id.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full pt-4">
                <label>Pilih Beautician</label>
                <select
                  {...register("beautician_id")}
                  className="select select-bordered border-black w-full"
                >
                  <option value="">Pilih Beautician</option>
                  {beautician.map((bt) => (
                    <option key={bt.id} value={bt.id}>
                      {bt.name}
                    </option>
                  ))}
                </select>
                {errors.beautician_id && (
                  <p className="text-red-500 mt-2 text-xs">
                    {errors.beautician_id.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full pt-4">
                <CInputDatePicker
                  label="Tanggal Treatment"
                  register={register}
                  errors={errors.treatment_date}
                  name={"treatment_date"}
                  setValue={setValue}
                  initialValue={getValues("treatment_date")}
                  icon={FaCalendarAlt}
                />
              </div>
            </div>
          )}
        </Modal.Body>

        <Modal.Actions className="flex w-full justify-end items-center gap-5">
          <Button
            type="button"
            onClick={onClose}
            className="w-[30%] lg:w-[10%] p-2 rounded-xl bg-gray-500 text-white hover:bg-gray-800"
          >
            Keluar
          </Button>
          <Button
            type="submit"
            className="w-[30%] lg:w-[10%] p-2 rounded-xl bg-[#f30b6a] hover:bg-[#c20250] text-white"
          >
            Simpan
          </Button>
        </Modal.Actions>
      </form>
    </Modal>
  );
};

export default CSTransactionModal;
