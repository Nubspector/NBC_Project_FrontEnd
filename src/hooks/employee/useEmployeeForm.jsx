import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  updateEmployee,
} from "../../api/admin/employee";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../api";

const useEmployees = (type, id, refetch) => {
  const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [success, setSuccess] = useState(false);

  const createEmployeeSchema = yup.object().shape({
    name: yup.string().required("Nama employee wajib diisi"),
    username: yup.string().required("Username employee wajib diisi"),
    email: yup
      .string()
      .email("Masukkan email yang valid")
      .required("Email wajib diisi"),
    role_id: yup.string().required("Role wajib diisi"),
    address: yup.string().required("Alamat wajib diisi"),
    phone_number: yup.string().required("Nomor telepon wajib diisi"),
    image: yup
      .object()
      .shape({ file: yup.mixed().required("Image wajib diisi") }),
    password: yup.string().required("Password wajib diisi"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password tidak sama")
      .required("Konfirmasi password wajib diisi"),
  });

  const updateEmployeeSchema = yup.object().shape({
    name: yup.string().notRequired(),
    username: yup.string().notRequired(),
    email: yup.string().email("Masukkan email yang valid").notRequired(),
    role_id: yup.string().notRequired(),
    address: yup.string().notRequired(),
    phone_number: yup.string().notRequired(),
    image: yup.object().shape({ file: yup.mixed().notRequired() }),
  });

  const employeeSchema =
    type === "create" ? createEmployeeSchema : updateEmployeeSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(employeeSchema),
  });

  useEffect(() => {
    if (type === "edit" && id) {
      fetchEmployeeById(id);
    } else {
      reset({
        name: "",
        username: "",
        email: "",
        role_id: "",
        address: "",
        phone_number: "",
        image: "",
      });
    }
  }, [type, id, reset]);

  const handleCreateEmployee = async (data) => {
    try {
      const file = data.image.file[0];
      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", data.name);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("role_id", data.role_id);
      formData.append("address", data.address);
      formData.append("phone_number", data.phone_number);
      formData.append("password", data.password);
      formData.append("password_confirmation", data.password_confirmation);

      await createEmployee(formData); 
      setSuccess(true);
      reset();
    } catch (error) {
      throw new Error(error);
    } 
  };

  const handleEditEmployee = async (data, id) => {
    try {
      const formData = new FormData();
      if (data.image.file[0]) {
        formData.append("image", data.image.file[0]);
      }
      formData.append("name", data.name);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("role_id", data.role_id);
      formData.append("address", data.address);
      formData.append("phone_number", data.phone_number);

      await updateEmployee(formData, id);
      setSuccess(true);
      reset();
    } catch (error) {
      throw new Error(error);
    }
  };

  const fetchEmployeeById = async (id) => {
    try {
      const response = await getEmployeeById(id);
      const image = await getImage(response.image);
      setSelectedEmployee({ ...response, image: { url: image } });
      reset({ ...response, image: { url: image } });
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleEmployeesForm = handleSubmit(async (data) => {
    if (type === "create") {
      await handleCreateEmployee(data);
    } else if (type === "edit" && id) {
      await handleEditEmployee(data, id);
    }
  });

  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployee(id);
      setSuccess(true);
    } catch (error) {}
  };

  return {
    control,
    register,
    handleSubmit: handleEmployeesForm,
    errors,
    selectedEmployee,
    fetchEmployeeById,
    handleDeleteEmployee,
    reset,
    watch,
    success,
  };
};

export default useEmployees;
