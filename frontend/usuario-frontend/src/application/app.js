import { getSignosList, getSintomasList, getCondicionesList, getDepartamentosList, getOcupacionesList } from "../api/public-api.js";
import { createAccount, getUserAccountData } from "../api/usuario-account.api.js";

export default class App {

    // metodos static de la App, no necesitan estado
    static async getHistorialCitas() {
        const RESP = {success: true, hasHistory: false, historialCitas: [  {
    "cita": "C001",
    "motivo": "Control anual",
    "especialidad": "Cardiología",
    "fecha": "2024-03-05",
    "opciones": "Ver detalles"
  },
  {
    "cita": "C002",
    "motivo": "Dolor persistente",
    "especialidad": "Traumatología",
    "fecha": "2024-03-06",
    "opciones": "Editar"
        }]}
        return RESP;
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

