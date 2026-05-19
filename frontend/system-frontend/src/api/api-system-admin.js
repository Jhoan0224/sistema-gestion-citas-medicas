import axios from "axios";

const API_ADMIN = import.meta.env.VITE_API_SYSTEM_ADMIN;


export async function searchUserSysRequest(form, headers) {
    try {
        const resp = await axios.post(`${API_ADMIN}/search-user-form`, form, headers);
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}
