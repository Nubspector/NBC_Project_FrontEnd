import { toast } from "react-toastify";
import urlAxios from "..";

export const getAllSelectDoctor = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get("/employee/doctor", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Gagal mendapatkan daftar employee!");
    throw error.response;
  }
};

export const getAllSelectTreatment = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get("/treatment_transaction", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Gagal mendapatkan daftar treatment!");
    throw error.response.data;
  }
};

export const getAllSelectBeautician = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get("/employee/beautician", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Gagal mendapatkan daftar employee!");
    throw error.response.data;
  }
};

export const getAllSelectRoom = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get("/room_available", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Gagal mendapatkan daftar room!");
    throw error.response.data;
  }
};

export const getAllSelectProduct = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get("/product", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Gagal mendapatkan daftar product!");
    throw error.response;
  }
};

export const getAllSelectPromoTransaction = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get(`/promo/promo_transaction/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Gagal mendapatkan daftar Promo!");
    throw error.response;
  }
};
