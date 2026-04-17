import { mysqlConnPool } from "../../config/databases/mysql.js";
import { BAD_REQUEST, DUI_NOT_AVAILABLE, EMAIL_NOT_AVAILABLE } from "../../utils/http-status-messages.js";
import UsuarioEntity from "../../database/centro_salud_db/entity/usuario.entity.js";
import PasswordSecurity from "../security_svc/password-security.js";
import UsuarioVerficication from "./user_verifcations_svc/usuario-verification.svc.js";
import CitaEntity from "../../database/centro_salud_db/entity/cita.entity.js";

export const citaPendienteUsuario = async (idUsuario) => {
    const PROCESS_RESULT = {success: false, message: 'Al parecer no tienes ninguna cita medica pendiente.', citaInfo: {}};
    let conn = await mysqlConnPool.getConnection();
    try {
        const result = await CitaEntity.citaPendienteByUsuarioId(conn, idUsuario);
        if (!result) {
            PROCESS_RESULT.success = true;
            return PROCESS_RESULT;
        }

        PROCESS_RESULT.success = true;
        PROCESS_RESULT.message = "Tienes una cita medica pendiente."
        PROCESS_RESULT.citaInfo = result;

        return PROCESS_RESULT;

    } catch (error) {
        throw error;
    } finally {conn?.release();}
}

export const usuarioBasicInfo = async (idUsuario) => {
    const PROCESS_RESULT = {success: false, message: 'No se ha encontrado informacion.', usuarioBasicInfo: {}};
    let conn = await mysqlConnPool.getConnection();
    try {
        const result = await UsuarioEntity.infoBasicaById(conn, idUsuario);
        if (!result) {
            return PROCESS_RESULT;
        }

        PROCESS_RESULT.success = true;
        PROCESS_RESULT.message = "Informacion basica de usuario."
        PROCESS_RESULT.usuarioBasicInfo = result;

        return PROCESS_RESULT;

    } catch (error) {
        throw error;
    } finally {conn?.release();}
}

export const usuarioAccountInfo = async (idUsuario) => {
    const PROCESS_RESULT = {success: false, message: 'No se ha encontrado informacion.', usuarioAccountInfo: {}};
    let conn = await mysqlConnPool.getConnection();
    try {
        const result = await UsuarioEntity.accountInfoById(conn, idUsuario);
        if (!result) {
            return PROCESS_RESULT;
        }

        PROCESS_RESULT.success = true;
        PROCESS_RESULT.message = "Informacion cuenta de usuario."
        PROCESS_RESULT.usuarioAccountInfo = result;

        return PROCESS_RESULT;

    } catch (error) {
        throw error;
    } finally {conn?.release();}
}

export const createUserAccount = async (form) => {
    const PROCESS_RESULT = {success: false, message: 'Ocurrio un error, la cuenta No se registro, intentelo de nuevo más tarde.'}
    let conn = await mysqlConnPool.getConnection();
    try {
        
        if (form.pass1 !== form.pass2) {return BAD_REQUEST;}  
        console.log('Verificando email');
        if (await UsuarioVerficication.emailIsAvailable(conn, form.email) === false) {
            return EMAIL_NOT_AVAILABLE;
        }

        if (await UsuarioVerficication.duiIsAvailable(conn, form.dui) === false) {
            return DUI_NOT_AVAILABLE;
        }

        const passwordHash = await PasswordSecurity.getPasswordHash(form.pass1);

        const values = [form.dui, form.nombre, form.apellido, form.fechaNacimiento,
            form.email, passwordHash, form.zonaResidencia, form.ocupacionId , form.condicionId
        ];
        
        const usuarioDb = new UsuarioEntity(conn);
        const result = await usuarioDb.createAccount(values);
        
        if (result.insertId) {
            PROCESS_RESULT.success = true;
            PROCESS_RESULT.message = "La cuenta de usuario se registo con exito."
            return PROCESS_RESULT;
        }
        
        return PROCESS_RESULT;

    } catch (error) {
        throw error;
    } finally {
        conn?.release();
    }
};