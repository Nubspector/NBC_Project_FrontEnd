import { Button, Modal } from "react-daisyui";
import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { MinusIcon, PlusIcon } from "@heroicons/react/16/solid";
import useShift from "../../../hooks/shift/useFetchShift";
import useEmployee from "../../../hooks/employee/useFetchSelect";
import useSchedules from "../../../hooks/schedule/useScheduleForm";

export default function UpsertModalSchedule({ isOpen, type, handler, id }) {
  const {
    register,
    handleSubmit,
    errors,
    success,
    control,
    defaultSchedules,
    getValues,
  } = useSchedules(type, id);

  const [loading, setLoading] = useState(false);
  const { shiftEmployee, fetchShiftEmployee } = useShift();
  const { employees } = useEmployee();

  useEffect(() => {
    if (success) {
      handler(true);
    }
    handler(false);
  }, [success]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedules",
  });

  return (
    <Modal
      open={isOpen}
      backdrop={false}
      className="flex flex-col bg-white lg:min-w-[900px] h-[650px] p-5 rounded-lg overflow-scroll"
    >
      <form onSubmit={handleSubmit}>
        <Modal.Body className="flex flex-col justify-start items-start">
          <p className="text-xl font-semibold text-start">
            {type === "create" ? "Form Create" : "Edit"} Schedule
          </p>
          <div className="grid grid-cols-2 w-full gap-5">
            <div className="flex flex-col col-span-2 gap-2 w-full pt-4">
              <div className="flex flex-col w-full">
                <label htmlFor="employee_id">Employee</label>
                {type === "edit" ? (
                  <div className="py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
                    {employees.find((employee) => employee.id === id)?.name ||
                      "Employee not found"}
                  </div>
                ) : (
                  <select
                    {...register("employee_id")}
                    className={`select select-bordered border-black w-full transition-all duration-300 
        ${errors.employee_id ? "border-red-500" : "border-black"} 
        focus:ring-1 focus:ring-black focus:border-transparent rounded-md`}
                    onChange={(e) => fetchShiftEmployee(e.target.value)}
                  >
                    <option value="">Select Employee</option>
                    {employees
                      .filter(
                        (employee) =>
                          employee.role_id === 2 || employee.role_id === 3
                      )
                      .map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.name} - {employee.role.name}
                        </option>
                      ))}
                  </select>
                )}
                {errors.employee_id && (
                  <span className="text-red-500 text-sm">
                    {errors.employee_id.message}
                  </span>
                )}
              </div>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center">
                <div className="flex flex-col w-full">
                  <div className="flex items-center space-x-1">
                    <label htmlFor={`schedules.${index}.shift_id`}>
                      Shift {index + 1}
                    </label>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-600 p-2 hover:bg-red-200 rounded-full"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <select
                    {...register(`schedules.${index}.shifts`)}
                    className={`select select-bordered border-black w-full transition-all duration-300 
                      ${
                        errors.schedules?.[index]?.shift_id
                          ? "border-red-500"
                          : "border-black"
                      } 
                      focus:ring-1 focus:ring-black focus:border-transparent rounded-md`}
                  >
                    <option value="">Select Shift</option>
                    {shiftEmployee.map((shift) => (
                      <option key={shift.id} value={shift.id}>
                        {shift.day} - {shift.time_slot} - {shift.start_time} -{" "}
                        {shift.end_time}
                      </option>
                    ))}
                  </select>
                  {errors.schedules?.[index]?.shifts && (
                    <span className="text-red-500 text-sm">
                      {errors.schedules[index].shifts.message}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full mt-4">
            <button
              type="button"
              onClick={() => append(defaultSchedules)}
              className="flex items-center justify-center space-x-2 text-green-600 hover:bg-gray-100 rounded-full p-2"
            >
              <PlusIcon className="w-6 h-6" />
              <span>Add Schedule</span>
            </button>
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
            className={`w-[30%] lg:w-[10%] p-2 rounded-xl bg-[#f30b6a] hover:bg-[#c20250] text-white`}
            loading={loading}
          >
            Simpan
          </Button>
        </Modal.Actions>
      </form>
    </Modal>
  );
}
