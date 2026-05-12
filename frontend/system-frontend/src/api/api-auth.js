import axios from "axios";

const API_AUTH = import.meta.env.VITE_API_AUTH;


/* Auth Personal Medico */
export async function loginPersonalMedRequest(form) {
    try {
        const resp = await axios.post(`${API_AUTH}/login-personal-medico`);
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function verifyPersonalMedJWT() {
    try {
        const resp = await axios.post(`${API_AUTH}/verify-login-personal-medico`);
        return resp.data;
    } catch (error) {
        return false;
    }
}


/* Auth Admin */
export async function loginAdminRequest(form) {
    try {
        const resp = await axios.post(`${API_AUTH}/login-admin`);
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function verifyAdminJWT() {
    try {
        const resp = await axios.post(`${API_AUTH}/verify-login-admin`);
        return resp.data;
    } catch (error) {
        return false;
    }
}

export async function getCurrentUserProfile() {
    try {
        const resp = await axios.post(`${API_AUTH}/get-current-user-profile`);
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}




