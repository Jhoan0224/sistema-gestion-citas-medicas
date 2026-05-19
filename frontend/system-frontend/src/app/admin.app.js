import * as ApiSystem from '../api/api-system.js'
import * as ApiAdmin from '../api/api-system-admin.js'
import { HTTP_HEADERS } from "../app/auth.app.js";

export class AdminApp {

    static async currentUserProfile() {
        const data = await ApiSystem.getCurrentUserProfile();
        return data;
    }

    static async searchUserSys(form) {
        const data = await ApiAdmin.searchUserSysRequest(form, HTTP_HEADERS());
        return data;
    }

    static async listRolesPrivilegios() {
        const data = await ApiSystem.getListRolesPrivilegios();
        return data;
    }
}