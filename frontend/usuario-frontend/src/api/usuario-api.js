import axios from "axios"

const URL_USER_ACCOUNT = import.meta.env.VITE_API_USER_ACCOUNT;
const TOKEN_NAME = import.meta.env.VITE_TOKEN_NAME;
const ID_NAME = import.meta.env.VITE_ID_NAME;

const HEADER_USUARIO = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_NAME)}`
    }
});

const ID_USER = () => {
    return localStorage.getItem(ID_NAME);
};


export async function getUsuarioBasicInfo(){
    try {
        const resp = await axios.get(`${URL_USER_ACCOUNT}/basic-info/user-id/${ID_USER()}`, HEADER_USUARIO());
        return resp.data;
        
    } catch (error) {
        return false;
    }
};

export async function getCitaPendienteUsuario(){
    try {
        const resp = await axios.get(`${URL_USER_ACCOUNT}/cita-pendiente/user-id/${ID_USER()}`, HEADER_USUARIO());
        return resp.data;
        
    } catch (error) {
        return false;
    }
};