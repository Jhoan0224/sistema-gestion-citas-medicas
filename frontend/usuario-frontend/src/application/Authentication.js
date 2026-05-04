import { loginUsuario, validarTokenAuth } from "../api/auth.js";
import { getUsuarioBasicInfo } from "../api/usuario-api.js";

const TOKEN_NAME = import.meta.env.VITE_TOKEN_NAME;
const ID_NAME = import.meta.env.VITE_ID_NAME;

export function userSignOutAccount() {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(ID_NAME);
    location.reload();
}

export function saveNewUserAccountToken(TOKEN, ID) {
    localStorage.setItem(TOKEN_NAME, TOKEN);
    localStorage.setItem(ID_NAME, ID);
}

export async function sendLoginUsuario(formLogin) {
    const resp = await loginUsuario(formLogin);

    if (resp.success) {
        localStorage.setItem(TOKEN_NAME, resp.token);
        localStorage.setItem(ID_NAME, resp.id);
    }
    return resp;
};

export async function validarSesionUsuario() {
    const RESP = {success: false, usuarioBasicInfo: {}};
    const myToken = localStorage.getItem(TOKEN_NAME);
    
    if (!myToken || !(await validarTokenAuth())) {return RESP};

    const respBasicInfo = await getUsuarioBasicInfo();

    RESP.success = true;
    RESP.usuarioBasicInfo = respBasicInfo.usuarioBasicInfo;

    return RESP;
};