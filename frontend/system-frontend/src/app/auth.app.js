import * as ApiSystem from '../api/api-system.js';
import * as ApiAuth from '../api/api-auth.js'

const token_name = import.meta.env.VITE_TOKEN_NAME;
const user_id_name = import.meta.env.VITE_USER_ID_NAME;

export const ID_USER_SESSION = () => (localStorage.getItem(user_id_name));
export const HTTP_HEADERS = () => ({
    headers: {
        authorization: `Bearer ${localStorage.getItem(token_name)}`
    }
})

export class AuthApp {

    static async currentUserProfile() {
        const data = await ApiSystem.getCurrentUserProfile();
        return data;
    }

    static async loginPersMed(form) {
        const data = await ApiAuth.loginPersonalMedRequest(form);
        if (data.success) {
            localStorage.setItem(user_id_name, data.id);
            localStorage.setItem(token_name, data.token);            
        }
        return data;
    }

    static async loginAdmin(form) {
        const data = await ApiAuth.loginAdminRequest(form);
        if (data.success) {
            localStorage.setItem(user_id_name, data.id);
            localStorage.setItem(token_name, data.token);            
        }
        return data;
    }

    static async verifyAdminIsLogged() {
        const data = await ApiAuth.verifyAdminJWT(HTTP_HEADERS());
        return data;
    }

    static async verifyPersonalMedIsLogged() {       
        const data = await ApiAuth.verifyPersonalMedJWT(HTTP_HEADERS());        
        return data;
    }

    static handleSignOut() {
        localStorage.removeItem(user_id_name);
        localStorage.removeItem(token_name);
        location.reload();
    }
}