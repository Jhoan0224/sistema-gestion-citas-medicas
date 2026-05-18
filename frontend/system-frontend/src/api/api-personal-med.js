import axios from "axios";

const API_PERSONAL_MED = import.meta.env.VITE_API_PERSONAL_MED;
import { HTTP_HEADERS } from "../app/auth.app.js";


export async function getUserCitaAgendaHoy() {
    try {
        const resp = await axios.get(`${API_PERSONAL_MED}/agenda-citas-hoy`, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

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
        const resp = await axios.post(`${API_PERSONAL_MED}/create-user-account`, form, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function agendaCitaUsuarioRequest(form) {
    try {
        const resp = await axios.post(`${API_PERSONAL_MED}/agendar-cita-user`, from, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getUserAccountInfo(idUsuario) {
    try {
        const resp = await axios.get(`${API_PERSONAL_MED}/usuario-account-data/${idUsuario}`, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getUserCitasAsistidas(idUsuario) {
    try {
        const resp = await axios.get(`${API_PERSONAL_MED}/usuario-citas-asistidas/${idUsuario}`, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getUserCitasInasistidas(idUsuario) {
    try {
        const resp = await axios.get(`${API_PERSONAL_MED}/usuario-citas-inasistidas/${idUsuario}`, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getUserCitasCanceladas(idUsuario) {
    try {
        const resp = await axios.get(`${API_PERSONAL_MED}/usuario-citas-canceladas/${idUsuario}`, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getUserCitaPendiente(idUsuario) {
    try {
        const resp = await axios.get(`${API_PERSONAL_MED}/usuario-cita-pendiente/${idUsuario}`, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}