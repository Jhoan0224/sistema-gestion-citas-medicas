import * as ApiLogin from '../api/api-auth.js'

const token_name = import.meta.env.VITE_TOKEN_NAME;
const user_id_name = import.meta.env.VITE_USER_ID_NAME

export class AuthApp {

    static async loginSystem(form) {
        const data = await ApiLogin.loginRequest(form);
        return data;
    }

    static async verifyAdminIsLogged(form) {
        const data = await ApiLogin.verifyAdminJWT(form);
        return data;
    }

    static async verifyPersonalMedIsLogged(form) {
        const data = await ApiLogin.verifyPersonalMedJWT(form);
        return data;
    }

    static handleSignOut() {
        localStorage.removeItem(user_id_name);
        localStorage.removeItem(token_name);
        location.reload();
    }
}