import axios from "axios"
export const Base_URL = "https://nbc-be.saun.my.id"; //ganti local host dengan ip address klo mau postman

export const getImage = (image) => {
    return `${Base_URL}/storage/images/${image}`;
};

// export const getImageBuktiPembayaran = (image) => {
//     return `${Base_URL}/storage/bukti_pembayaran/${image}`;
// };

const urlAxios = axios.create({
    baseURL: `${Base_URL}/api`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
export default urlAxios;