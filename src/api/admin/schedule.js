import urlAxios from "..";
import { toast } from "react-toastify";

export const createSchedule = async (data) => {
    const token = localStorage.getItem("token");
    try {
        const response = await urlAxios.post("/schedule", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        toast.success("Schedule berhasil dibuat!");
        return response.data;
    } catch (error) {
        console.error("Error creating schedule:", error.response.data);
        toast.error("Gagal membuat schedule!");
        return error.response.data;
    }
};

export const updateSchedule = async (data, id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await urlAxios.put(`/schedule/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        toast.success("Schedule berhasil diperbarui!");
        return response.data;
    } catch (error) {
        console.log("Error updating schedule:", error);
        toast.error("Gagal memperbarui schedule!");
        return error.response.data;
    }
};

export const deleteSchedule = async (id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await urlAxios.delete(`/schedule/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        toast.success("Schedule berhasil dihapus!");
        return response.data;
    } catch (error) {
        toast.error("Gagal menghapus schedule!");
        return error.response.data;
    }
};

export const getScheduleById = async (id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await urlAxios.get(`/schedule/employee/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        toast.error("Gagal mendapatkan data schedule!");
        return error.response.data;
    }
};

export const getAllSchedule = async (page, searchParams = {}) => {
    const token = localStorage.getItem("token");
    try {
        const response = await urlAxios.get("/schedule_doctor", {
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
        toast.error("Gagal mendapatkan daftar schedule!");
        throw error.response.data;
    }
};
