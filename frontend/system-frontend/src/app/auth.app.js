import * as ApiLogin from '../api/api-auth.js'

const token_name = import.meta.env.VITE_TOKEN_NAME;
const user_id_name = import.meta.env.VITE_USER_ID_NAME

export const HTTP_HEADERS = () => ({
    headers: {
        authorization: `Bearer ${localStorage.getItem(token_name)}`
    }
}); 

export class AuthApp {

    static async loginPersMed(form) {
        const data = await ApiLogin.loginPersonalMedRequest(form);
        if (data.success) {
            localStorage.setItem(user_id_name, data.id);
            localStorage.setItem(token_name, data.token);            
        }
        return data;
    }

    static async loginAdmin(form) {
        const data = await ApiLogin.loginAdminRequest(form);
        if (data.success) {
            localStorage.setItem(user_id_name, data.id);
            localStorage.setItem(token_name, data.token);            
        }
        return data;
    }

    static async verifyAdminIsLogged(form) {
        const data = await ApiLogin.verifyAdminJWT(form);
        return data;
    }

    static async verifyPersonalMedIsLogged() {       
        const data = await ApiLogin.verifyPersonalMedJWT(HTTP_HEADERS());        
        return data;
    }

    static handleSignOut() {
        localStorage.removeItem(user_id_name);
        localStorage.removeItem(token_name);
        location.reload();
    }
}