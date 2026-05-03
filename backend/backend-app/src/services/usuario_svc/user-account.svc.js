import { mysqlConnPool } from "../../config/databases/mysql.js";
import { BAD_REQUEST, DUI_NOT_AVAILABLE, EMAIL_NOT_AVAILABLE } from "../../utils/http-status-messages.js";
import UsuarioEntity from "../../database/centro_salud_db/entity/usuario.entity.js";
import PasswordSecurity from "../security_svc/password-security.js";
import UsuarioVerficication from "./user_verifcations_svc/usuario-verification.svc.js";
import CitaEntity from "../../database/centro_salud_db/entity/cita.entity.js";
import { log } from "console";

export const historialCitasAsistidasUsuario = async (idUsuario) => {
    const PROCESS_RESULT = {success: false, message: 'Al parecer no tienes historial de citas medicas Asistidas.', historialCitas: {}};
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
    } finally {conn?.release();}
}

export const historialCitasCanceladasUsuario = async (idUsuario) => {
    const PROCESS_RESULT = {success: false, message: 'Al parecer no tienes historial de citas medicas Canceladas.', historialCitas: {}};
    let conn = await mysqlConnPool.getConnection();
    try {
        console.log("data");
        
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
    } finally {conn?.release();}
}

export const historialCitasInasistidasUsuario = async (idUsuario) => {
    const PROCESS_RESULT = {success: false, message: 'Al parecer no tienes historial de citas medicas Inasistidas.', historialCitas: []};
    let conn = await mysqlConnPool.getConnection();
    try {
        console.log("data");
        
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
    } finally {conn?.release();}
}

export const citaPendienteUsuario = async (idUsuario) => {
    const PROCESS_RESULT = {success: false, message: 'Al parecer no tienes ninguna cita medica pendiente.', citaInfo: {}};
    let conn = await mysqlConnPool.getConnection();
    try {
        console.log("data");
        
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

export const usuarioInfoUpdateAccount = async (idUsuario) => {
    const PROCESS_RESULT = {success: false, message: 'No se ha encontrado informacion.', usuarioInfo: {}};
    let conn = await mysqlConnPool.getConnection();
    try {
        const result = await UsuarioEntity.infoUpdateAccountById(conn, idUsuario);
        if (!result) {
            return PROCESS_RESULT;
        }

        PROCESS_RESULT.success = true;
        PROCESS_RESULT.message = "Informacion de actualizacion de cuenta de usuario."
        PROCESS_RESULT.usuarioInfo = result;

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

export const userUpdateDataAccount = async (form) => {
    const PROCESS_RESULT = {success: false, message: 'Ocurrio un error, no se pudo actualizar la informacion de la cuenta, intentelo de nuevo más tarde.'}
    let conn = await mysqlConnPool.getConnection();
    try {
        
        const values = [
            form.dui, form.nombre, form.apellido, form.fecha_nacimiento.split("T")[0], form.zona_residencia,
            form.idCondicion, form.idOcupacion, form.id
        ];

        const dataAccountUpdated = await UsuarioEntity.updateDataAccount(conn, values);
            
        if (dataAccountUpdated) {
            PROCESS_RESULT.success = true;
            PROCESS_RESULT.message = "La infomacion de la Cuenta se actualizo con exito."
            return PROCESS_RESULT;   
        } else {
            PROCESS_RESULT.message = "Ocurrio un error al actualizar la infomacion de la Cuenta."
            return PROCESS_RESULT; 
        }
        
    } catch (error) {
        throw error;
    } finally {
        conn?.release();
    }
};

export const userDeleteAccount = async (form) => {
    const PROCESS_RESULT = {success: false, message: 'Ocurrio un error, al eliminar la cuenta, intentelo de nuevo o comunicate con soporte.'}
    let conn = await mysqlConnPool.getConnection();
    try {       
        const accountDeleted = await UsuarioEntity.userDeleteAccountByEmail(conn, [form.email]);
            
        if (accountDeleted) {
            PROCESS_RESULT.success = true;
            PROCESS_RESULT.message = "Tu Cuenta ha sido eliminada correctamente."
            return PROCESS_RESULT;   
        }        
        return PROCESS_RESULT; 

    } catch (error) {
        throw error;
    } finally {
        conn?.release();
    }
};

export const userUpdateSecurityAccount = async (form) => {
    const PROCESS_RESULT = {success: false, message: 'Ocurrio un error, la cuenta No se registro, intentelo de nuevo más tarde.'}
    let conn = await mysqlConnPool.getConnection();
    try {
        
        if (form.newPassCheck1 !== form.newPassCheck2) {return BAD_REQUEST;}  

        const passHash = await UsuarioEntity.credentialsAccountVerifyByEmail(conn, form.email);
        
        if(!passHash || !PasswordSecurity.passwordMatches(form.pass, passHash)) {
            PROCESS_RESULT.message = "Tu Email o Contraseña no coinciden, intentalo de nuevo."
            return PROCESS_RESULT
        }

        const newPasswordHash = await PasswordSecurity.getPasswordHash(form.newPassCheck1);
        
        if (form.isEmailModified) {
            if (await UsuarioVerficication.emailIsAvailable(conn, form.newEmail) === false) {
                PROCESS_RESULT.message = "El Nuevo Email al que deseas actualizar no esta disponible";
                return PROCESS_RESULT;
            }
    console.log("ok1");
            
            const values = [form.newEmail, newPasswordHash, form.idUser];
            const credentialsUpdated = await UsuarioEntity.updateCredentialsEmailPass(conn, values);
            
            if (credentialsUpdated) {
                PROCESS_RESULT.success = true;
                PROCESS_RESULT.message = "Las credenciales de seguridad se actualizaron con exito."
                return PROCESS_RESULT;
            } else {
                PROCESS_RESULT.message = "Ocurrio un error al actualizar las credeciales de seguridad."
                return PROCESS_RESULT;   
            }
        }
        console.log("ok2");

        const values = [newPasswordHash, form.idUser];   
        const credentialsUpdated = await UsuarioEntity.updateCredentialsPass(conn,values);
    
        console.log("ok" + credentialsUpdated);

        if (credentialsUpdated) {
            PROCESS_RESULT.success = true;
            PROCESS_RESULT.message = "Las credenciales de seguridad se actualizaron con exito."
            return PROCESS_RESULT;
        } else {
            PROCESS_RESULT.message = "Ocurrio un error al actualizar las credeciales de seguridad."
            return PROCESS_RESULT;   
        }

    } catch (error) {
        throw error;
    } finally {
        conn?.release();
    }
};