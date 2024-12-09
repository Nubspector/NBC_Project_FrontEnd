import urlAxios from "..";
import { toast } from "react-toastify";

export const createRoom = async (data) => {
    const token = localStorage.getItem("token");
    try {
        const response = await urlAxios.post("/room", data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        toast.success("Room berhasil dibuat!");
        return response.data;
    } catch (error) {
        console.error("Error creating room:", error.response.data);
        toast.error("Gagal membuat room!");
        return error.response.data;
    }
};

export const updateRoom = async (data, id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await urlAxios.put(`/room/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        toast.success("Room berhasil diperbarui!");
        return response.data;
    } catch (error) {
        console.log("Error updating room:", error);
        toast.error("Gagal memperbarui room!");
        return error.response.data;
    }
};

export const deleteRoom = async (id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await urlAxios.delete(`/room/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        toast.success("Room berhasil dihapus!");
        return response.data;
    } catch (error) {
        toast.error("Gagal menghapus room!");
        return error.response.data;
    }
};

export const getRoomById = async (id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await urlAxios.get(`/room/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        toast.error("Gagal mendapatkan data room!");
        return error.response.data;
    }
};

export const getAllRoom = async (page, searchParams = {}) => {
    const token = localStorage.getItem("token");
    try {
        const response = await urlAxios.get("/room", {
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
        toast.error("Gagal mendapatkan daftar room!");
        throw error.response.data;
    }
};
