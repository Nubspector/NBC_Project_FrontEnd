import urlAxios from "..";

export const login = async (data) => {
    try {
        const response = await urlAxios.post("/login", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) { 
        throw error.response.data; 
    }
};
 