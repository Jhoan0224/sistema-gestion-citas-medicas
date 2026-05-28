import * as ApiSystem from '../api/api-system.js'
import * as ApiPersonalMed from '../api/api-personal-med.js'

export class PersonalMedApp {

    static async currentUserProfile() {
        const data = await ApiSystem.getCurrentUserProfile();
        return data;
    }

    static async userCitaAgendaHoy() {
        const data = await ApiPersonalMed.getUserCitaAgendaHoy();
        return data;
    }

    static async updateUserAccount(form) {
        const data = await ApiPersonalMed.updateUserAccountRequest(form);
        return data;
    }

    static async agendarCitaData() {
        const data = await ApiSystem.getListSignosSintomas();
        return data;
    }

    static async crearUsuarioData() {
        const data = await ApiSystem.getListOcupacionesCondiciones();
        return data;
    }

    /* ---------- */
    static async searchUserForm(form) {
        const data = await ApiPersonalMed.searchUserRequest(form);
        return data;
    }

    static async createUserAccount(form) {
        const data = await ApiPersonalMed.createUserAccountRequest(form);
        return data;
    }

    static async agendarCitaUsuario(form) {
        const data = await ApiPersonalMed.agendaCitaUsuarioRequest(form);
        return data;
    }

    /* Info de Usuario API */
    static async historialCitasAsistidas(idUsuario) {
        const data = await ApiPersonalMed.getUserCitasAsistidas(idUsuario);
        return data;
    }

    static async historialCitasInasistidas(idUsuario) {
        const data = await ApiPersonalMed.getUserCitasInasistidas(idUsuario);
        return data;
    }

    static async historialCitasCanceladas(idUsuario) {
        const data = await ApiPersonalMed.getUserCitasCanceladas(idUsuario);
        return data;
    }

    static async userCitaPendiente(idUsuario) {
        const data = await ApiPersonalMed.getUserCitaPendiente(idUsuario);
        return data;
    }

    static async userAccountData(idUsuario) {
        const data = await ApiPersonalMed.getUserAccountInfo(idUsuario);
        return data;
    }
}