import { getSignosList, getSintomasList, getCondicionesList, getDepartamentosList, getOcupacionesList } from "../api/public-api.js";
import { createAccount, getInfoUpdadeAccount, getUserAccountData } from "../api/usuario-account.api.js";
import { getHistoriaCitasAsistidasUsuario, getHistoriaCitasCanceladasUsuario, getHistoriaCitasInasistidasUsuario } from "../api/usuario-api.js";

export default class App {

    // metodos static de la App, no necesitan estado
    static async getHistorialCitas(filtroHistorial) {
        switch (filtroHistorial) {
            case 'ASISTIDAS':
            return await getHistoriaCitasAsistidasUsuario();
                break;
            case 'CANCELADAS':
                return await getHistoriaCitasCanceladasUsuario();
                break;
            case 'PERDIDAS':
                return await getHistoriaCitasInasistidasUsuario();
                break;
        }
    }

    static async loadDataCrearCuenta() {
        const RESP = {success: false, ocupacionesList: [], condicionesList: []};

        const ocupacionesData = await getOcupacionesList();
        const condicionesData = await getCondicionesList();
        
        if (ocupacionesData.success && condicionesData.success) {
                RESP.ocupacionesList = ocupacionesData.ocupaciones;
                RESP.condicionesList = condicionesData.condiciones;
                RESP.success = true;
        }
        return RESP;
    }

    static async loadDataUpdateCuenta() {
        const RESP = {success: false, usuarioInfo: {}, ocupacionesList: [], condicionesList: []};
        const usuarioData = await getInfoUpdadeAccount();
        const ocupacionesData = await getOcupacionesList();
        const condicionesData = await getCondicionesList();
        
        if (usuarioData.success && ocupacionesData.success && condicionesData.success) {
                RESP.usuarioInfo = usuarioData.usuarioInfo;
                RESP.ocupacionesList = ocupacionesData.ocupaciones;
                RESP.condicionesList = condicionesData.condiciones;
                RESP.success = true;
        }
        return RESP;
    }

    static async loadDataAgendarCita() {
        const RESP = {success: false, signosList: [], sintomasList: []};

        const signosData = await getSignosList();
        const sintomasData = await getSintomasList();
        
        if (signosData.success && sintomasData.success) {
                RESP.signosList = signosData.signos;
                RESP.sintomasList = sintomasData.sintomas;
                RESP.success = true;
        }
        return RESP;
    }

    static async userCreateAccount(formData) {
        await createAccount(formData);
    }
    
    static async loadUserAccountData() {

        return await getUserAccountData();
    }

}

