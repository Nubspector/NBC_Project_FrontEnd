import urlAxios from "..";
import { toast } from "react-toastify";

export const createCustomer = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.post("/customer", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Customer berhasil dibuat!");
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error.response.data);
    toast.error("Gagal membuat customer!");
    return error.response.data;
  }
};

export const updateCustomer = async (data, id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.post(`/customer/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Customer berhasil diperbarui!");
    return response.data;
  } catch (error) {
    console.log("Error updating customer:", error);
    toast.error("Gagal memperbarui customer!");
    return error.response.data;
  }
};

export const deleteCustomer = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.delete(`/customer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Customer berhasil dihapus!");
    return response.data;
  } catch (error) {
    toast.error("Gagal menghapus customer!");
    return error.response.data;
  }
};

export const getCustomerById = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get(`/customer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Gagal mendapatkan data customer!");
    return error.response.data;
  }
};

export const getAllCustomer = async (page, searchParams = {}) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get("/customer", {
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
    toast.error("Gagal mendapatkan daftar customer!");
    throw error.response.data;
  }
};

export const getAllSelectCustomer = async (params) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get("/customer", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return response.data;
  } catch (error) {
    toast.error("Gagal mendapatkan daftar customer!");
    throw error.response.data;
  }
};
