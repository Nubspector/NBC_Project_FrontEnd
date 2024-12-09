import urlAxios from "..";
import { toast } from "react-toastify";

export const createProduct = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.post("/product", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Product berhasil dibuat!");
    return response.data;
  } catch (error) {
    toast.error("Gagal membuat product!");
    console.error("Error creating product:", error.response);
    return error.response.data;
  }
};

export const updateProduct = async (data, id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.post(`/product/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Product berhasil diperbarui!");
    return response.data;
  } catch (error) {
    toast.error("Gagal memperbarui product!");
    console.log("Error updating product:", error);
    return error.response.data;
  }
};

export const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.delete(`/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Product berhasil dihapus!");
    return response.data;
  } catch (error) {
    toast.error("Gagal menghapus product!");
    return error.response.data;
  }
};

export const getProductById = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get(`/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Gagal mengambil product!");
    return error.response.data;
  }
};

export const getAllProduct = async (page, searchParams = {}) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get("/product", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        ...searchParams,
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Gagal mengambil product!");
    throw error.response.data;
  }
};
