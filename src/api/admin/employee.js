import urlAxios from "..";
import { toast } from "react-toastify";

export const createEmployee = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.post("/employee", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Employee berhasil dibuat!");
    return response.data;
  } catch (error) {
    console.error("Error creating employee:", error.response.data);
    toast.error("Gagal membuat employee!");
    return error.response.data;
  }
};

export const updateEmployee = async (data, id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.post(`/employee/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Employee berhasil diperbarui!");
    return response.data;
  } catch (error) {
    console.log("Error updating employee:", error);
    toast.error("Gagal memperbarui employee!");
    return error.response.data;
  }
};

export const deleteEmployee = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.delete(`/employee/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Employee berhasil dihapus!");
    return response.data;
  } catch (error) {
    toast.error("Gagal menghapus employee!");
    return error.response.data;
  }
};

export const getEmployeeById = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get(`/employee/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Gagal mendapatkan data employee!");
    return error.response.data;
  }
};

export const getAllEmployee = async (page, searchParams = {}) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get("/employee", {
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
    toast.error("Gagal mendapatkan daftar employee!");
    throw error.response.data;
  }
};

export const getAllSelectEmployee = async (params) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get("/employee", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return response.data;
  } catch (error) {
    toast.error("Gagal mendapatkan daftar employee!");
    throw error.response.data;
  }
};


