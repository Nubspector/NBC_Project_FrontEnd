import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  createRoom,
  deleteRoom,
  getRoomById,
  updateRoom,
} from "../../api/admin/room";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRooms = (type, id, refetch) => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [success, setSuccess] = useState(false);

  const createRoomSchema = yup.object().shape({
    name: yup.string().required("Nama Room wajib diisi"),
    status: yup.string().required("Status wajib diisi"),
  });

  const updateRoomSchema = yup.object().shape({
    name: yup.string().notRequired(),
    status: yup.string().notRequired(),
  });

  const roomSchema = type === "create" ? createRoomSchema : updateRoomSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(roomSchema),
  });

  useEffect(() => {
    if (type === "edit" && id) {
      fetchRoomById(id);
    } else {
      reset({
        name: "",
        type: "",
        status: "",
      });
    }
  }, [type, id, reset]);

  const handleCreateRoom = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("status", data.status);

      await createRoom(formData);
      setSuccess(true);
      reset();
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleEditRoom = async (data, id) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("status", data.status);

      await updateRoom(formData, id);
      setSuccess(true);
      reset();
    } catch (error) {
      throw new Error(error);
    }
  };

  const fetchRoomById = async (id) => {
    try {
      const response = await getRoomById(id);
      reset(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleRoomsForm = handleSubmit(async (data) => {
    if (type === "create") {
      await handleCreateRoom(data);
    } else if (type === "edit" && id) {
      await handleEditRoom(data, id);
    }
  });

  const handleDeleteRoom = async (id) => {
    try {
      await deleteRoom(id);
      setSuccess(true);
    } catch (error) {}
  };

  return {
    control,
    register,
    handleSubmit: handleRoomsForm,
    errors,
    selectedRoom,
    fetchRoomById,
    handleDeleteRoom,
    reset,
    watch,
    success,
  };
};

export default useRooms;
