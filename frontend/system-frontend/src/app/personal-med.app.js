import { data } from 'react-router-dom';
import * as ApiSystem from '../api/api-system.js'
import * as ApiPersonalMed from '../api/api-personal-med.js'

export class PersonalMedApp {

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



}