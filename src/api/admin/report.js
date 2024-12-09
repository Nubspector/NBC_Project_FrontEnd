import urlAxios from "..";
import { toast } from "react-toastify";

// Report: Customer Baru Per Bulan
export const reportCustomerBaru = async (data) => {
    const token = localStorage.getItem("token");
    console.log(data);
 
    try {
        const response = await urlAxios.post("/report/customerBaru", {"tahun" : data }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching customer baru report:", error.response.data);
        return error.response.data;
    }
};

// Report: Pendapatan Per Bulan
export const reportPendapatan = async (data) => {
    const token = localStorage.getItem("token");
    try {
        const response = await urlAxios.post("/report/pendapatan", {"tahun" : data }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching pendapatan report:", error.response.data);
        return error.response.data;
    }
};

// Report: Produk Terlaris Per Bulan
export const reportProdukTerlaris = async (data) => {
    const token = localStorage.getItem("token");
    try {
        const response = await urlAxios.post("/report/produkTerlaris", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Report: Perawatan Terlaris Per Bulan
export const reportPerawatanTerlaris = async (data) => {
    const token = localStorage.getItem("token");
    try {
        const response = await urlAxios.post("/report/perawatanTerlaris", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching perawatan terlaris report:", error.response.data);
        return error.response.data;
    }
};

// Report: Customer Perawatan Per Dokter Per Bulan
export const reportCustomerPerawatanPerDokter = async (data) => {
    const token = localStorage.getItem("token");
    try {
        const response = await urlAxios.post("/report/customerPerawatanPerDokter", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching customer perawatan per dokter report:", error.response.data);
        return error.response.data;
    }
};
