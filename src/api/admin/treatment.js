import urlAxios from "..";
import { toast } from "react-toastify";

export const createTreatment = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.post("/treatment", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Treatment berhasil dibuat!");
    return response.data;
  } catch (error) {
    toast.error("Gagal membuat treatment!");
    console.error("Error creating employee:", error);
    return error.response.data;
  }
};

export const updateTreatment = async (data, id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.post(`/treatment/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Treatment berhasil diperbarui!");
    return response.data;
  } catch (error) {
    toast.error("Gagal memperbarui treatment!");
    console.log("Error updating treatment:", error);
    return error.response.data;
  }
};

export const deleteTreatment = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.delete(`/treatment/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Treatment berhasil dihapus!");
    return response.data;
  } catch (error) {
    toast.error("Gagal menghapus treatment!");
    return error.response.data;
  }
};

export const getTreatmentById = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get(`/treatment/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Gagal mengambil treatment!");
    return error.response.data;
  }
};

export const getAllTreatment = async (page, searchParams = {}) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get("/treatment", {
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
    toast.error("Gagal mengambil treatment!");
    throw error.response.data;
  }
};


