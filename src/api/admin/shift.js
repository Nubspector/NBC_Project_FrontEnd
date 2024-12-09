import urlAxios from "..";

export const getAllShift = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get("/shift", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Gagal mendapatkan daftar shift!");
    throw error.response.data;
  }
};

export const getAllShiftEmployee = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get(`/shift/employee/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Gagal mendapatkan daftar shift!");
    throw error.response.data;
  }
};
