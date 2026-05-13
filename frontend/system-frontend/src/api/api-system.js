import axios from "axios";

const API_SYSTEM = import.meta.env.VITE_API_SYSTEM;

import { HTTP_HEADERS } from "../app/auth.app.js";

export async function getCurrentUserProfile() {
    try {
        const resp = await axios.get(`${API_SYSTEM}/current-user-profile`, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getListSignosSintomas() {
    try {
        const resp = await axios.get(`${API_SYSTEM}/list-signos-sintomas`, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getListRoles() {
    try {
        const resp = await axios.get(`${API_SYSTEM}/list-roles`, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getListPermisos() {
    try {
        const resp = await axios.get(`${API_SYSTEM}/list-permisos`, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getListOcupacionesCondiciones() {
    try {
        const resp = await axios.get(`${API_SYSTEM}/list-ocupaciones-condiciones`, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getListOcupaciones() {
    try {
        const resp = await axios.get(`${API_SYSTEM}/list-signos-sintomas`, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getListCondiciones() {
    try {
        const resp = await axios.get(`${API_SYSTEM}/list-signos-sintomas`, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}