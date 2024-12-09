import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  updateCustomer,
} from "../../api/admin/customer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../api";

const useCustomer = (type, id, isCard, refetch) => {
  const navigate = useNavigate();

  const createCustomerSchema = yup.object().shape({
    name: yup.string().required("Nama customer wajib diisi"),
    email: yup
      .string()
      .email("Masukkan email yang valid")
      .required("Email wajib diisi"),
    address: yup.string().required("Alamat wajib diisi"),
    phone_number: yup.string().required("Nomor telepon wajib diisi"),
    gender: yup.string().required("Jenis kelamin wajib diisi"),
    allergy: yup.string().required("Alergi wajib diisi"),
    date_of_birth: yup
      .date()
      .typeError("Tanggal lahir wajib diisi")
      .required("Tanggal lahir wajib diisi")
      .max(new Date(), "Tanggal lahir tidak boleh lebih dari hari ini"),
  });

  const updateCustomerSchema = yup.object().shape({
    name: yup.string().required("Nama customer wajib diisi"),
    email: yup
      .string()
      .email("Masukkan email yang valid")
      .required("Email wajib diisi"),
    address: yup.string().required("Alamat wajib diisi"),
    phone_number: yup.string().required("Nomor telepon wajib diisi"),
    gender: yup.string().required("Jenis kelamin wajib diisi"),
    allergy: yup.string().required("Alergi wajib diisi"),
    date_of_birth: yup
      .date()
      .typeError("Tanggal lahir wajib diisi")
      .required("Tanggal lahir wajib diisi")
      .max(new Date(), "Tanggal lahir tidak boleh lebih dari hari ini"),
  });

  const customerSchema =
    type === "create" ? createCustomerSchema : updateCustomerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
    setValue,
    getValues,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(customerSchema),
  });

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if ((type === "edit" || isCard === "view" || isCard === "transaction") && id) {
      fetchCustomerById(id);
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

  const handleCreateCustomer = async (data) => {
    try {
      const file = data.image.file[0];
      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("gender", data.gender);
      formData.append("address", data.address);
      formData.append("phone_number", data.phone_number);
      formData.append("allergy", data.allergy);
      const formattedStartDate = data.date_of_birth
        ? data.date_of_birth
            .toLocaleDateString("id-ID", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .split("/")
            .reverse()
            .join("-")
        : "";
      formData.append("date_of_birth", formattedStartDate);
      formData.append("password_confirmation", data.password_confirmation);
      formData.append("points", 0);
      formData.append("points_used", 0);
      await createCustomer(formData);
      setSuccess(true);
      reset();
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleEditCustomer = async (data, id) => {
    try {
      const formData = new FormData();
      if (data.image.file[0]) {
        formData.append("image", data.image.file[0]);
      }
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("address", data.address);
      formData.append("phone_number", data.phone_number);
      formData.append("gender", data.gender);
      formData.append("allergy", data.allergy);
      const formattedStartDate = data.date_of_birth
        ? data.date_of_birth
            .toLocaleDateString("id-ID", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .split("/")
            .reverse()
            .join("-")
        : "";
      formData.append("date_of_birth", formattedStartDate);

      await updateCustomer(formData, id);
      setSuccess(true);
      reset();
    } catch (error) {
      throw new Error(error);
    }
  };

  const fetchCustomerById = async (id) => {
    console.log("ini id", id);
    try {
      const response = await getCustomerById(id);
      const image = await getImage(response.image);
      setSelectedCustomer({ ...response, image: { url: image } });
      reset({ ...response, image: { url: image } });
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleCutomersForm = handleSubmit(async (data) => {
    if (type === "create") {
      await handleCreateCustomer(data);
    } else if (type === "edit" && id) {
      await handleEditCustomer(data, id);
    }
  });

  const handleDeleteCustomer = async (id) => {
    try {
      await deleteCustomer(id);
      setSuccess(true);
    } catch (error) {}
  };

  return {
    control,
    register,
    handleSubmit: handleCutomersForm,
    errors,
    selectedCustomer,
    fetchCustomerById,
    handleDeleteCustomer,
    reset,
    watch,
    success,
    setValue,
    getValues,
  };
};

export default useCustomer;
