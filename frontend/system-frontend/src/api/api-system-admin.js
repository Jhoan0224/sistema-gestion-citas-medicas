import axios from "axios";

const API_PERSONAL_MED = import.meta.env.VITE_API_PERSONAL_MED;


export async function searchUserRequest(form) {
    try {
        const resp = await axios.post(`${API_PERSONAL_MED}/search-user-form`);
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}
