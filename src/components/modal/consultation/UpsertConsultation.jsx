import React from "react";
import { Button, Modal } from "react-daisyui";
import useFetchProduct from "../../../hooks/select/useFetchProduct";
import useFetchTreatment from "../../../hooks/select/useFetchTreatment";
import useFetchBeautician from "../../../hooks/select/useFetchBeautician";
import useFetchRoom from "../../../hooks/select/useFetchRoom";
import useConsultationForm from "../../../hooks/transaction/doctor/useConsultationForm";
import { FaPlus } from "react-icons/fa";
import { MinusIcon } from "@heroicons/react/24/solid";

export default function UpsertConsultation({ isOpen, type, handler, id }) {
  const {
    register,
    handleSubmit,
    errors,
    productFields,
    appendProduct,
    removeProduct,
    treatmentFields,
    appendTreatment,
    removeTreatment,
    data
  } = useConsultationForm(id, type, () => handler(true));

  const { product } = useFetchProduct();
  const { treatment } = useFetchTreatment();
  const { beautician } = useFetchBeautician();
  const { room } = useFetchRoom();

  return (
    <Modal
      open={isOpen}
      onClose={() => handler(false)}
      className="flex flex-col bg-white lg:min-w-[900px] h-[650px] p-5 rounded-lg overflow-y-auto max-h-screen"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-start items-start">
          <p className="text-xl font-semibold text-start mb-6">
            {type === "create"
              ? "Create Consultation Form"
              : "Edit Consultation Form"}
          </p>
          <div className="grid grid-cols-2 w-full gap-5">
            <div className="col-span-2 gap-2 w-full">
              <label
                htmlFor="description"
                className="text-gray-700 font-medium"
              >
                Description
              </label>
              <textarea
                {...register("description")}
                id="description"
                rows="4"
                placeholder="Enter description"
                className="textarea textarea-bordered w-full transition-all duration-300 border-black focus:ring-1 focus:ring-black focus:border-transparent rounded-md"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="w-full col-span-2">
              <label className="text-gray-700 font-medium mb-2 block">
                Products
              </label>
              <div className="grid gap-5">
                {productFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center space-x-4 mb-4"
                  >
                    <select
                      {...register(`products.${index}.id`)}
                      className="select select-bordered w-full transition-all duration-300 border-black focus:ring-1 focus:ring-black focus:border-transparent rounded-md"
                    >
                      <option value="">Select Product</option>
                      {product.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    <input
                      {...register(`products.${index}.quantity`, { min: 1 })}
                      type="number"
                      placeholder="Quantity"
                      className="input input-bordered w-24 border-black focus:ring-1 focus:ring-black focus:border-transparent rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className="text-red-600 p-2 hover:bg-red-200 rounded-full"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => appendProduct({ id: "", quantity: 1 })}
                className="flex items-center mt-3 font-medium text-green-600 hover:text-green-700 transition"
              >
                <FaPlus className="mr-1" /> Add Product
              </button>
            </div>
            {/* Treatments Fields */}
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
                      {...register(`treatments.${index}.treatment_id`)}
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
                onClick={() => appendTreatment({ treatment_id: "" })}
                className="flex items-center mt-3 font-medium text-green-600 hover:text-green-700 transition"
              >
                <FaPlus className="mr-1" /> Add Treatment
              </button>
            </div>
            <div className="w-full col-span-2 mt-4">
              <label htmlFor="room_id" className="text-gray-700 font-medium">
                Room
              </label>
              <select
                {...register("room_id")}
                defaultValue={101}
                id="room_id"
                className="select select-bordered w-full mt-2 border-black focus:ring-1 focus:ring-black focus:border-transparent rounded-md"
              >
                <option value="">Select Room</option>
                {room.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full col-span-2 mt-4">
              <label
                htmlFor="beautician_id"
                className="text-gray-700 font-medium"
              >
                Beautician
              </label>
              <select
                {...register("beautician_id")}
                id="beautician_id"
                className="select select-bordered w-full mt-2 border-black focus:ring-1 focus:ring-black focus:border-transparent rounded-md"
              >
                <option value="">Select Beautician</option>
                {beautician.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-end items-center mt-8 space-x-3">
          <Button
            className="w-[30%] lg:w-[10%] p-2 rounded-xl bg-gray-500 text-white hover:bg-gray-800 transition"
            type="button"
            onClick={() => handler(false)}
          >
            Close
          </Button>
          <Button
            type="submit"
            className="w-[30%] lg:w-[10%] p-2 rounded-xl bg-[#f30b6a] hover:bg-[#c20250] text-white"
          >
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}
