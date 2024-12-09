import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  createPromo,
  deletePromo,
  getPromoById,
  updatePromo,
} from "../../api/admin/promo";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../api";

const usePromos = (type, id, refetch) => {
  const navigate = useNavigate();
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [success, setSuccess] = useState(false);

  const createPromoSchema = yup.object().shape({
    name: yup.string().required("Nama treatment wajib diisi"),
    description: yup.string().required("Deskripsi wajib diisi"),
    discount: yup
      .number()
      .typeError("Harga harus berupa angka")
      .positive("Diskon harus lebih besar dari 0")
      .required("Harga wajib diisi"),
    start_date: yup
      .date()
      .typeError("Tanggal mulai wajib diisi")
      .required("Tanggal mulai wajib diisi"),
    end_date: yup
      .date()
      .typeError("Tanggal selesai wajib diisi")
      .required("Tanggal selesai wajib diisi")
      .min(
        yup.ref("start_date"),
        "Tanggal selesai harus setelah tanggal mulai"
      ),
  });

  const updatePromoSchema = yup.object().shape({
    name: yup.string().notRequired(),
    description: yup.string().notRequired(),
    discount: yup
      .number()
      .typeError("Harga harus berupa angka")
      .positive("Diskon harus lebih besar dari 0")
      .notRequired(),
    start_date: yup
      .date()
      .typeError("Tanggal mulai harus berupa tanggal")
      .notRequired(),
    end_date: yup
      .date()
      .typeError("Tanggal selesai harus berupa tanggal")
      .when("start_date", (start_date, schema) =>
        start_date
          ? schema.min(
              start_date,
              "Tanggal selesai harus setelah tanggal mulai"
            )
          : schema
      )
      .notRequired(),
  });

  const promoSchema = type === "create" ? createPromoSchema : updatePromoSchema;

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
    resolver: yupResolver(promoSchema),
  });

  useEffect(() => {
    if (type === "edit" && id) {
      fetchPromoById(id);
    } else {
      reset({
        name: "",
        description: "",
        discount: "",
        start_date: "",
        end_date: "",
      });
    }
  }, [type, id, reset]);

  const handleCreatePromo = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("discount", data.discount);

      const formattedStartDate = data.start_date
        ? data.start_date
            .toLocaleDateString("id-ID", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .split("/")
            .reverse()
            .join("-") 
        : "";

      const formattedEndDate = data.end_date
        ? data.end_date
            .toLocaleDateString("id-ID", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .split("/")
            .reverse()
            .join("-") 
        : "";

      formData.append("start_date", formattedStartDate);
      formData.append("end_date", formattedEndDate);

      await createPromo(formData);
      setSuccess(true);
      reset();
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleEditPromo = async (data, id) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("discount", data.discount);

      const formattedStartDate = data.start_date
        ? data.start_date
            .toLocaleDateString("id-ID", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .split("/")
            .reverse()
            .join("-") 
        : "";

      const formattedEndDate = data.end_date
        ? data.end_date
            .toLocaleDateString("id-ID", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .split("/")
            .reverse()
            .join("-") 
        : "";

      formData.append("start_date", formattedStartDate);
      formData.append("end_date", formattedEndDate);

      await updatePromo(formData, id);
      setSuccess(true);
      reset();
    } catch (error) {
      throw new Error(error);
    }
  };

  const fetchPromoById = async (id) => {
    try {
      const response = await getPromoById(id);
      reset({
        ...response,
        start_date: response.start_date.split("T")[0],
        end_date: response.end_date.split("T")[0],
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const handlePromosForm = handleSubmit(async (data) => {
    if (type === "create") {
      await handleCreatePromo(data);
    } else if (type === "edit" && id) {
      await handleEditPromo(data, id);
    }
  });

  const handleDeletePromo = async (id) => {
    try {
      await deletePromo(id);
      setSuccess(true);
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    control,
    register,
    handleSubmit: handlePromosForm,
    errors,
    selectedPromo,
    fetchPromoById,
    handleDeletePromo,
    reset,
    watch,
    success,
    getValues,
    setValue,
  };
};

export default usePromos;
