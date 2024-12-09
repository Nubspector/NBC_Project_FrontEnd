import urlAxios from "..";

export const getAllRole = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await urlAxios.get("/role", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Gagal mendapatkan daftar role!");
    throw error.response.data;
  }
};
