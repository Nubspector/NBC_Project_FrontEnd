import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createSchedule,
  deleteSchedule,
  getScheduleById,
  updateSchedule,
} from "../../api/admin/schedule";

const useSchedules = (type, id, refetch) => {
  const navigate = useNavigate();
  const [selectedSchedules, setSelectedSchedules] = useState(null);
  const [success, setSuccess] = useState(false);

  const createScheduleSchema = yup.object().shape({
    employee_id: yup.string().required("Employee wajib diisi"),
    schedules: yup
      .array()
      .of(
        yup.object({
          shifts: yup.string().required("Shift wajib diisi"),
        })
      )
      .min(1, "Minimal 1 schedule")
      .required("Schedule is required")
      
  });

  const updateScheduleSchema = yup.object().shape({
    employee_id: yup.string().notRequired(),
    schedules: yup
      .array()
      .of(
        yup.object({
          shifts: yup.string().notRequired(),
        })
      )
      .min(1, "Minimal 1 schedule")
      .notRequired()
      
  });

  const scheduleSchema =
    type === "create" ? createScheduleSchema : updateScheduleSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
    getValues,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(scheduleSchema),
  });

  const defaultSchedules = {
    shifts: "",
  };

  useEffect(() => {
    if (type === "edit" && id) {
      fetchScheduleById(id);
    } else {
      reset({
        employee_id: "",
        schedules: "",
      });
    }
  }, [type, id, reset]);

  const handleCreateSchedule = async (data) => {
    try {
      const formattedData = {
        employee_id: data.employee_id,
        shifts: data.schedules.map((schedule) => ({
          id: schedule.shifts,
        })),
      };

      await createSchedule(formattedData);
      setSuccess(true);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditSchedule = async (data, id) => {
    console.log(id);
    try {
      const formattedData = {
        shifts: data.schedules.map((schedule) => ({
          id: schedule.shifts,
        })),
      };

      await updateSchedule(formattedData, id);
      setSuccess(true);
      reset();
    } catch (error) {
      throw new Error(error);
    }
  };

  const fetchScheduleById = async (id) => {
    try {
      const response = await getScheduleById(id);

      const formattedData = {
        ...response,
        schedules: response.schedule.map((schedule) => ({
          shifts: schedule.shift.id,
        })),
      };

      reset(formattedData);
    } catch (error) {
      console.error("Failed to fetch schedule:", error);
    }
  };

  const handleSchedulesForm = handleSubmit(async (data) => {
    if (type === "create") {
      await handleCreateSchedule(data);
    } else if (type === "edit" && id) {
      await handleEditSchedule(data, id);
    }
  });

  const handleDeleteSchedule = async (id) => {
    try {
      await deleteSchedule(id);
      setSuccess(true);
    } catch (error) {}
  };

  return {
    control,
    register,
    handleSubmit: handleSchedulesForm,
    errors,
    selectedSchedules,
    fetchScheduleById,
    handleDeleteSchedule,
    reset,
    watch,
    defaultSchedules,
    success,
    getValues,
  };
};

export default useSchedules;
