import axios from "axios";

const API_SYSTEM = import.meta.env.VITE_API_SYSTEM;



export async function getCurrentUserProfile() {
    try {
        const resp = await axios.get(`${API_SYSTEM}/current-user-profile`);
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getListSignosSintomas() {
    try {
        const resp = await axios.get(`${API_SYSTEM}/list-signos-sintomas`);
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getListRoles() {
    try {
        const resp = await axios.get(`${API_SYSTEM}/list-roles`);
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getListPermisos() {
    try {
        const resp = await axios.get(`${API_SYSTEM}/list-permisos`);
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getListOcupacionesCondiciones() {
    try {
        const resp = await axios.get(`${API_SYSTEM}/list-ocupaciones-condiciones`);
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getListOcupaciones() {
    try {
        const resp = await axios.get(`${API_SYSTEM}/list-signos-sintomas`);
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getListCondiciones() {
    try {
        const resp = await axios.get(`${API_SYSTEM}/list-signos-sintomas`);
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}