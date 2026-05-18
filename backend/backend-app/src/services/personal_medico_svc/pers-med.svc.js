import { mysqlConnPool } from "../../config/databases/mysql.js";
import { CREDENTIALS_NOT_VALID } from "../../utils/http-status-messages.js";
import JwtToken from "../security_svc/jwt-token.svc.js";
import PasswordSecurity from "../security_svc/password-security.js";
import UsuarioEntity from "../../database/centro_salud_db/entity/usuario.entity.js";
import CitaEntity from "../../database/centro_salud_db/entity/cita.entity.js";


export async function userAccountDataSvc(idUsuario) {
    let conn = await mysqlConnPool.getConnection();
    const PROCESS_RESULT = {success: false, message: "No se ha encontrado informacion", usuarioAccountInfo: {}};
    try {
        const userInfo = await UsuarioEntity.accountInfoById(conn, idUsuario);
        if (!userInfo) {
            return PROCESS_RESULT;
        }

        PROCESS_RESULT.success = true;
        PROCESS_RESULT.message = "Informacion cuenta de usuario."
        PROCESS_RESULT.usuarioAccountInfo = userInfo;

        return PROCESS_RESULT;
    } catch (error) {
        throw error;
    } finally { conn?.release(); }
} 

export async function userCitasAsistidasSvc(idUsuario) {
    const PROCESS_RESULT = {success: false, message: 'Al parecer no tiene historial de citas medicas Asistidas.', historialCitas: []};
    let conn = await mysqlConnPool.getConnection();
    try {       
        const result = await CitaEntity.historialCitasAsistidasByUsuarioId(conn, idUsuario);
        if (result.length === 0) {
            PROCESS_RESULT.success = true;
            return PROCESS_RESULT;
        }

        PROCESS_RESULT.success = true;
        PROCESS_RESULT.message = "Historial de citas medicas Asistidas."
        PROCESS_RESULT.historialCitas = result;

        return PROCESS_RESULT;
    } catch (error) {
        throw error;
    } finally { conn?.release(); }
} 

export async function userCitasInasistidasSvc(idUsuario) {
    const PROCESS_RESULT = {success: false, message: 'Al parecer no tiene historial de citas medicas Inasistidas.', historialCitas: []};
    let conn = await mysqlConnPool.getConnection();
    try {
        const result = await CitaEntity.historialCitasPerdidasByUsuarioId(conn, idUsuario);      
        if (result.length === 0) {
            PROCESS_RESULT.success = true;
            return PROCESS_RESULT;
        }

        PROCESS_RESULT.success = true;
        PROCESS_RESULT.message = "Historial de citas medicas Inasistidas."
        PROCESS_RESULT.historialCitas = result;

        return PROCESS_RESULT;
    } catch (error) {
        throw error;
    } finally { conn?.release(); }
} 

export async function userCitasCanceladasSvc(idUsuario) {
    const PROCESS_RESULT = {success: false, message: 'Al parecer no tiene historial de citas medicas Canceladas.', historialCitas: []};
    let conn = await mysqlConnPool.getConnection();
    try {        
        const result = await CitaEntity.historialCitasCanceladasByUsuarioId(conn, idUsuario);
        if (result.length === 0) {
            PROCESS_RESULT.success = true;
            return PROCESS_RESULT;
        }

        PROCESS_RESULT.success = true;
        PROCESS_RESULT.message = "Historial de citas medicas Canceladas."
        PROCESS_RESULT.historialCitas = result;

        return PROCESS_RESULT;
    } catch (error) {
        throw error;
    } finally { conn?.release(); }
} 

export async function userCitaPendienteSvc(idUsuario) {
    const PROCESS_RESULT = {success: false, userHasCita: false, message: 'Al parecer no tiene ninguna cita medica pendiente.', citaInfo: {}};
    let conn = await mysqlConnPool.getConnection();
    try {
        
        const result = await CitaEntity.citaPendienteByUsuarioId(conn, idUsuario);
        if (!result) {
            PROCESS_RESULT.success = true;
            return PROCESS_RESULT;
        }

        PROCESS_RESULT.success = true;
        PROCESS_RESULT.message = "Tiene una cita medica pendiente."
        PROCESS_RESULT.citaInfo = result;
        PROCESS_RESULT.userHasCita = result;

        return PROCESS_RESULT;
    } catch (error) {
        throw error;
    } finally { conn?.release(); }
} 

export async function agendaCitasHoySvc() {
    let conn = await mysqlConnPool.getConnection();
    const PROCESS_RESULT = {success: false, message: "No hay citas agendas este dia", listCitas: []};
    try {
        const formatDateMysql = (date) => date.toISOString().slice(0, 19).replace('T', ' ');

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const tomorrowDate = new Date(currentDate);
        tomorrowDate.setDate(currentDate.getDate() + 1);

        const listCitas = await CitaEntity.getAgendaCitasHoy(conn, formatDateMysql(currentDate), formatDateMysql(tomorrowDate));
        
        if (listCitas.length === 0) { return PROCESS_RESULT }
        console.log(listCitas);
        
        PROCESS_RESULT.success = true;
        PROCESS_RESULT.message = "Citas agendas este dia.";
        PROCESS_RESULT.listCitas = listCitas;
        return PROCESS_RESULT;

    } catch (error) {
        throw error;
    } finally { conn?.release(); }
} 

export async function searchUserSvc(form) {
    let conn = await mysqlConnPool.getConnection();
    const PROCESS_RESULT = {success: false, userList: []};
    try {
        const filterAge = form.aproxAge === "ALL_AGE"
            ? [10, 90]
            : [Number(form.aproxAge), Number(form.aproxAge)];

        const searchQuery = {
            "DUI": (conn, values) => UsuarioEntity.findUserByDuiAndAge(conn, values),
            "EMAIL": (conn, values) => UsuarioEntity.findUserByEmailAndAge(conn, values),
            "FULLNAME": (conn, values) => UsuarioEntity.findUserByFullNameAndAge(conn, values)
        }

        const values = [`%${form.textSearch}%` ,...filterAge]
        const userList = await searchQuery[form.filterSearch](conn, values);
        
        // Check the password matches
        if (userList.length === 0) { return PROCESS_RESULT }
        console.log(userList);
        
        PROCESS_RESULT.success = true;
        PROCESS_RESULT.userList = userList;
        return PROCESS_RESULT;

    } catch (error) {
        throw error;
    } finally { conn?.release(); }
} 