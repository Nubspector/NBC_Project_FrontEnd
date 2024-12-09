import { toast } from "react-toastify";
import urlAxios from "..";

export const getAllListAntrianDoctor = async (page, searchParams = {}) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get("/transaction/antrian_doctor", {
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
    toast.error("Gagal mengambil data dokter!");
    return error.response.data;
  }
};

export const getRiwayatKonsultasiCustomerById = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get(`/consultation/customer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Gagal mengambil riwayat customer!");
    return error.response.data;
  }
};
export const getAllBelumBayar = async (page = 1, searchParams = {}) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get(`/transaction/belum_bayar`, {
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
    toast.error("Gagal mengambil riwayat transaksi belum bayar!");
    throw error.response.data;
  }
};

export const getAllTransactionCustomerById = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get(`/transaction/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Gagal mengambil riwayat transaksi belum bayar!");
    return error.response.data;
  }
};

export const createTransactionByDoctor = async (data, id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.post(`/transaction/doctor/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Berhasil membuat transaksi Doktor!");
    return response.data;
  } catch (error) {
    toast.error("Gagal mendapatkan daftar transaksi Doktor!");
    throw error.response;
  }
};

export const createTransaction = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.post(`/transaction/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Transaction berhasil dibuat!");
    return response.data;
  } catch (error) {
    toast.error("Gagal mendapatkan daftar transaction!");
    throw error.response;
  }
};

export const finishConsultation = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.post(
      `/transaction/finish_consultation/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Berhasil Merubah Status!");
    return response.data;
  } catch (error) {
    toast.error("Gagal mendapatkan daftar transaction!");
    throw error.response;
  }
};

export const fetchTransactionDoctorById = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get(`/consultationbyid/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("ini doctor data", response);
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch consultation data!");
    throw error.response;
  }
};

export const transactionPayment = async (data, id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.put(`/transaction/pay/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Transaction berhasil dibayar!");
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch consultation data!");
    throw error.response;
  }
};

export const getAllRiwayatTransaksi = async (page, searchParams = {}) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get(`/transaction_riwayat`, {
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
    toast.error("Failed to fetch consultation data!");
    throw error.response;
  }
};

export const getInvoice = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get(`/transaction/invoice/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch consultation data!");
    throw error.response;
  }
};
