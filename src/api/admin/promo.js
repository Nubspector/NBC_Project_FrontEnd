import urlAxios from "..";
import { toast } from "react-toastify";

export const createPromo = async (data) => {
    const token = localStorage.getItem("token");
    try {
        const response = await urlAxios.post("/promo", data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        toast.success("Promo berhasil dibuat!");
        return response.data;
    } catch (error) {
        console.error("Error creating promo:", error.response.data);
        toast.error("Gagal membuat promo!");
        return error.response.data;
    }
};

export const updatePromo = async (data, id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await urlAxios.put(`/promo/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        toast.success("Promo berhasil diperbarui!");
        return response.data;
    } catch (error) {
        console.log("Error updating promo:", error);
        toast.error("Gagal memperbarui promo!");
        return error.response.data;
    }
};

export const deletePromo = async (id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await urlAxios.delete(`/promo/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        toast.success("Promo berhasil dihapus!");
        return response.data;
    } catch (error) {
        toast.error("Gagal menghapus promo!");
        return error.response.data;
    }
};

export const getPromoById = async (id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await urlAxios.get(`/promo/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        toast.error("Gagal mendapatkan data promo!");
        return error.response.data;
    }
};

export const getAllPromo = async (page, searchParams = {}) => {
    const token = localStorage.getItem("token");
    try {
        const response = await urlAxios.get("/promo", {
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
        toast.error("Gagal mendapatkan daftar promo!");
        throw error.response.data;
    }
};
