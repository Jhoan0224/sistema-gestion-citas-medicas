import axios from "axios";

const API_PERSONAL_MED = import.meta.env.VITE_API_PERSONAL_MED;
import { HTTP_HEADERS } from "../app/auth.app.js";

export async function searchUserRequest(form) {
    try {
        const resp = await axios.post(`${API_PERSONAL_MED}/search-user-form`, form, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function createUserAccountRequest(form) {
    try {
        const resp = await axios.post(`${API_PERSONAL_MED}/create-user-account`, {}, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function agendaCitaUsuarioRequest(form) {
    try {
        const resp = await axios.post(`${API_PERSONAL_MED}/agendar-cita-user`, {}, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}