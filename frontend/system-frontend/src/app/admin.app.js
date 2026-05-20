import * as ApiSystem from '../api/api-system.js'
import * as ApiAdmin from '../api/api-system-admin.js'
import { HTTP_HEADERS } from "../app/auth.app.js";

export class AdminApp {

    static async currentUserProfile() {
        const data = await ApiSystem.getCurrentUserProfile();
        return data;
    }

    static async deleteNormalUserAccount(form) {
        const data = await ApiAdmin.deleteNormalUserAccountRequest(form);
        return data;
    }

    static async deleteUserSysAccount(form) {
        const data = await ApiAdmin.deleteUserSysAccountRequest(form);
        return data;
    }

    static async disableUserSysAccount(form) {
        const data = await ApiAdmin.disableUserSysAccountRequest(form);
        return data;
    }

    static async searchUserSys(form) {
        const data = await ApiAdmin.searchUserSysRequest(form, HTTP_HEADERS());
        return data;
    }

    static async searchNormalUser(form) {
        const data = await ApiAdmin.searchNormalUserRequest(form, HTTP_HEADERS());
        return data;
    }

    static async listRolesPrivilegios() {
        const data = await ApiSystem.getListRolesPrivilegios();
        return data;
    }

    static async userAccountData(idUsuario) {
        const data = await ApiAdmin.getUserSysAccountInfo(idUsuario);
        return data;
    }

    // Config tables database
    static async tableEstadoCita(tableName) {
        const data = await ApiAdmin.getTableEstadoCita(tableName);
        return data;
    }

    static async tableSignos(tableName) {
        const data = await ApiAdmin.getTableSignos(tableName);
        return data;
    }

    static async tableCondiciones(tableName) {
        const data = await ApiAdmin.getTableCondiciones(tableName);
        return data;
    }

    static async tableSintomas(tableName) {
        const data = await ApiAdmin.getTableSintomas(tableName);
        return data;
    }

    static async tableOcupaciones(tableName) {
        const data = await ApiAdmin.getTableOcupaciones(tableName);
        return data;
    }

    static async tableEspecialidad(tableName) {
        const data = await ApiAdmin.getTableEspecialidad(tableName);
        return data;
    }


    // tables for admin
    static async tableRoles(tableName) {
        const data = await ApiAdmin.getTableRoles(tableName);
        return data;
    }

    static async tablePrivilegios(tableName) {
        const data = await ApiAdmin.getTablePrivilegios(tableName);
        return data;
    }

}