import axios from "axios"

const URL_USER_AUTH = import.meta.env.VITE_API_USER_AUTH;
const TOKEN_NAME = import.meta.env.VITE_TOKEN_NAME;

const HEADER_USUARIO = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_NAME)}`
    }
});

export async function validarTokenAuth(){
    try {
        const resp = await axios.get(`${URL_USER_AUTH}/validar-token-user`, HEADER_USUARIO());
        
        return resp.data;
        
    } catch (error) {
        return false;
    }
}

export async function loginUsuario(formLogin){
    try {   
        const resp = await axios.post(`${URL_USER_AUTH}/user-login`, formLogin);
        console.log(resp.data);
        return resp.data;        
    } catch (error) {
        console.dir( error);
        return error.response.data;
    }
}