import axios from "axios"

const URL_USER_ACCOUNT = import.meta.env.VITE_API_USER_ACCOUNT;
const TOKEN_NAME = import.meta.env.VITE_TOKEN_NAME;
const ID_NAME = import.meta.env.VITE_ID_NAME;

const HEADER_USUARIO = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_NAME)}`
    }
});

export const ID_USER = () => {
    return localStorage.getItem(ID_NAME);
};

export async function getUsuarioBasicInfo(){
    try {
        const httpResquest = `${URL_USER_ACCOUNT}/basic-info/user-id/${ID_USER()}`;
        const resp = await axios.get(httpResquest, HEADER_USUARIO());
        return resp.data;        
    } catch (error) {
        return false;
    }
};

export async function  getCitaPendienteUsuario(){
    try {
        const resp = await axios.get(`${URL_USER_ACCOUNT}/cita-pendiente/user-id/${ID_USER()}`, HEADER_USUARIO());
        return resp.data;
    } catch (error) {
        return false;
    }
};

export async function  getHistoriaCitasAsistidasUsuario(){
    try {
        const resp = await axios.get(`${URL_USER_ACCOUNT}/historial-citas-asistidas/user-id/${ID_USER()}`, HEADER_USUARIO());
        return resp.data;        
    } catch (error) {
        return false;
    }
};

export async function  getHistoriaCitasCanceladasUsuario(){
    try {
        const resp = await axios.get(`${URL_USER_ACCOUNT}/historial-citas-canceladas/user-id/${ID_USER()}`, HEADER_USUARIO());
        return resp.data;        
    } catch (error) {
        return false;
    }
};

export async function  getHistoriaCitasInasistidasUsuario(){
    try {
        const resp = await axios.get(`${URL_USER_ACCOUNT}/historial-citas-inasistidas/user-id/${ID_USER()}`, HEADER_USUARIO());
        return resp.data;        
    } catch (error) {
        return false;
    }
};