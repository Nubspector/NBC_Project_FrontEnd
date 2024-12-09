import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
} from "../../api/admin/product";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../api";

const useProducts = (type, id, refetch) => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [success, setSuccess] = useState(false);

  const createProductSchema = yup.object().shape({
    name: yup.string().required("Nama product wajib diisi"),
    description: yup.string().required("Deskripsi wajib diisi"),
    price: yup.string().required("Harga wajib diisi"),
    category: yup.string().required("Kategori wajib diisi"),
    weight: yup.string().required("Berat wajib diisi"),
    unit: yup.string().required("Unit wajib diisi"),
    stock: yup.string().required("Stok wajib diisi"),
    image: yup
      .object()
      .shape({ file: yup.mixed().required("Image wajib diisi") }),
  });

  const updateProductSchema = yup.object().shape({
    name: yup.string().notRequired(),
    description: yup.string().notRequired(),
    price: yup.string().notRequired(),
    category: yup.string().notRequired(),
    weight: yup.string().notRequired(),
    unit: yup.string().notRequired(),
    stock: yup.string().notRequired(),
    image: yup.object().shape({ file: yup.mixed().notRequired() }),
  });

  const productSchema =
    type === "create" ? createProductSchema : updateProductSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(productSchema),
  });

  useEffect(() => {
    if (type === "edit" && id) {
      fetchProductById(id);
    } else {
      reset({
        name: "",
        description: "",
        price: "",
        category: "",
        weight: "",
        unit: "",
        stock: "",
        image: "",
      });
    }
  }, [type, id, reset]);

  const handleCreateProduct = async (data) => {
    try {
      const file = data.image.file[0];
      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("weight", data.weight);
      formData.append("unit", data.unit);
      formData.append("stock", data.stock);
      await createProduct(formData);
      setSuccess(true);
      reset();
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleEditProduct = async (data, id) => {
    try {
      const formData = new FormData();
      if (data.image.file[0]) {
        formData.append("image", data.image.file[0]);
      }
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("weight", data.weight);
      formData.append("unit", data.unit);
      formData.append("stock", data.stock);

      await updateProduct(formData, id);
      setSuccess(true);
      reset();
    } catch (error) {
      throw new Error(error);
    }
  };

  const fetchProductById = async (id) => {
    try {
      const response = await getProductById(id);
      const image = await getImage(response.image);
      setSelectedProduct({ ...response, image: { url: image } });
      reset({ ...response, image: { url: image } });
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleProductsForm = handleSubmit(async (data) => {
    if (type === "create") {
      await handleCreateProduct(data);
    } else if (type === "edit" && id) {
      await handleEditProduct(data, id);
    }
  });

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setSuccess(true);
    } catch (error) {}
  };

  return {
    control,
    register,
    handleSubmit: handleProductsForm,
    errors,
    selectedProduct,
    fetchProductById,
    handleDeleteProduct,
    reset,
    watch,
    success,
  };
};

export default useProducts;
