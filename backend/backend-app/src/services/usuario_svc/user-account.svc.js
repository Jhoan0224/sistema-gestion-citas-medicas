import { mysqlConnPool } from "../../config/databases/mysql.js";
import { BAD_REQUEST, DUI_NOT_AVAILABLE, EMAIL_NOT_AVAILABLE } from "../../utils/http-status-messages.js";
import UsuarioEntity from "../../database/centro_salud_db/entity/usuario.entity.js";
import PasswordSecurity from "../security_svc/password-security.js";
import UsuarioVerficication from "./user_verifcations_svc/usuario-verification.svc.js";
import CitaEntity from "../../database/centro_salud_db/entity/cita.entity.js";
import { log } from "console";
import JwtToken from "../security_svc/jwt-token.svc.js";
import { AppointmentScheduleEngine, SpecialityAppointmentEngine } from "../../utils/appointment-schedule.engine.js";

export const agendarCitaUsuario = async (form) => {
    const PROCESS_RESULT = {success: false, message: 'Ocurrio un error al Agendar la Cita Medica', citaInfo: {}};
    let conn = await mysqlConnPool.getConnection();
    try {
        const DEFAULT_ID_ESTADO_CITA = 1; /* ESTADO_CITA AGENDADA */ 
        
        console.log("OKI 0")
        const idUsuario = form.id_usuario
            ? form.id_usuario
            : await UsuarioEntity.findIdUsuarioByDui(conn, form.dui);

        console.log(idUsuario)
        /* Verifcicar que el Usuario actual no tenga ninguna Cita Medica en estado Agendada o Confirmada */
        console.log("OKI 0.1")
        const userHasScheduleAppoitment = await CitaEntity.citaPendienteByUsuarioId2(conn, idUsuario);
        
        console.log("OKI 1")
        /* Notificar la usuario que no puede agendar cita */ 
        if (userHasScheduleAppoitment === true) {
            PROCESS_RESULT.message = "El usuario tiene una Cita Agendada o Confirmada."
            return PROCESS_RESULT;
        }

        /* Analisis de Agenda de Cita utilizando el Motor de Regla
        - El Analisis se basa en: signosIds, sintomasIds, horarioPreferido y tipoAtencion
        - El Analisis devolvera: id_especialidad, fecha_hora_atencion
        */

        console.log("OKI 2")

        const newDateAppintment = await AppointmentScheduleEngine(form);
        if (newDateAppintment == null) {return PROCESS_RESULT}

        const IdSpecialityAppointment = await SpecialityAppointmentEngine(form);
console.log("OKI 2.22 >> " + IdSpecialityAppointment)
        
console.log("OKI 2.2")
  console.log(newDateAppintment)

    console.log("OKI 22")
    const valuesCita = [form.titulo, form.motivo, newDateAppintment, IdSpecialityAppointment, DEFAULT_ID_ESTADO_CITA, idUsuario];
    
    /* Iniciar Transaccion SQL */
    conn.beginTransaction();
    
    const resultAgendarCita = await CitaEntity.agendarCitaUsuarioById(conn, valuesCita);
    const idCitaAgendada = resultAgendarCita.insertId;
    console.log("cita agendada ", resultAgendarCita.insertId)

        if (idCitaAgendada <= 0) {
            /* Cancelar la Transaccion*/
            conn.rollback();
            return PROCESS_RESULT;
        }

        const valuesMatrizCitaSintomas = form.sintomasIds.map(idSintoma => [idCitaAgendada, idSintoma]);
        const valuesMatrizCitaSignos = form.signosIds.map(idSigno => [idCitaAgendada, idSigno]);
        
        /* Insertar IDs de sintomas y signos basados en ID de la cita agendada */
        const resultCitaSintomas = await CitaEntity.addCitaSintomasByCitaId(conn, valuesMatrizCitaSintomas);
        const resultCitaSignos = await CitaEntity.addCitaSignosByCitaId(conn, valuesMatrizCitaSignos);
console.log(resultCitaSignos);
console.log(resultCitaSintomas);

        /* Verifcicar registros de Signos y Sintomas */
        if (resultCitaSintomas.affectedRows === 0 || resultCitaSignos.affectedRows === 0) {
            /* Hacer rollback ya que algo fallo en el registro correcto de datos */
            conn.rollback();
            return PROCESS_RESULT;
        }

        /* Finalmente podemos informal al Usuario que su cita se agendo correctamente 
        - Hacemos un commit de la Transaccion SQL
        */
        conn.commit();

        PROCESS_RESULT.success = true;
        PROCESS_RESULT.message = "La Cita Medica se agendo extisosamente."
        PROCESS_RESULT.citaInfo = {id_cita: resultAgendarCita.insertId};

        return PROCESS_RESULT;

    } catch (error) {
        throw error;
    } finally {conn?.release();}
}

export const historialCitasAsistidasUsuario = async (idUsuario) => {
    const PROCESS_RESULT = {success: false, message: 'Al parecer no tienes historial de citas medicas Asistidas.', historialCitas: []};
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
    const PROCESS_RESULT = {success: false, message: 'Al parecer no tienes historial de citas medicas Canceladas.', historialCitas: []};
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
    const PROCESS_RESULT = {success: false, userHasCita: false, message: 'Al parecer no tienes ninguna cita medica pendiente.', citaInfo: {}};
    let conn = await mysqlConnPool.getConnection();
    try {
                
        const result = await CitaEntity.citaPendienteByUsuarioId(conn, idUsuario);

        if (!result) {return PROCESS_RESULT}

        PROCESS_RESULT.userHasCita = true;
        PROCESS_RESULT.success = true;
        PROCESS_RESULT.citaInfo = result[0];   
        PROCESS_RESULT.message = "Tienes una cita medica pendiente."

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
    const PROCESS_RESULT = {success: false, id: "", token: "",  message: 'Ocurrio un error, la cuenta No se registro, intentelo de nuevo más tarde.'}
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

            // build the Token payload
            const DEFAULT_USUARIO_ROL = ["USUARIO"];
            const TOKEN_PAYLOAD = {
                id: result.insertId,
                roles: DEFAULT_USUARIO_ROL
            }

            const TOKEN = await JwtToken.generateJwt(TOKEN_PAYLOAD);

            PROCESS_RESULT.success = true;
            PROCESS_RESULT.token = TOKEN;
            PROCESS_RESULT.id = result.insertId;
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

export const createUserAccountFromPersMed = async (form) => {
    const PROCESS_RESULT = {success: false, id: "", message: 'Ocurrio un error al registrar la cuenta, intentelo de nuevo.'}
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
            PROCESS_RESULT.id = result.insertId;
            PROCESS_RESULT.message = "La cuenta de usuario se registo correctamente."
            
            return PROCESS_RESULT;
        }
        
        return PROCESS_RESULT;

    } catch (error) {
        throw error;
    } finally {
        conn?.release();
    }
};


export const updateUserNormalAccount = async (form) => {
    const PROCESS_RESULT = {success: false,  message: 'Ocurrio un error, la cuenta del usuario no se actualizo, intentelo de nuevo más tarde.'}
    let conn = await mysqlConnPool.getConnection();
    try {
        
        const fecha_nacimiento = form?.fecha_nacimiento.split("T")[0];
        const values = [form.nombre, form.apellido, fecha_nacimiento, form.zona_residencia, form.idOcupacion , form.idCondicion, form.email];
        const result = await UsuarioEntity.updateAccountByEmail(conn, values);
        
        if (result) {
            PROCESS_RESULT.success = true;
            PROCESS_RESULT.message = "La cuenta de usuario se actulizo correctamente."
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

export const userDeleteCitaAgendada = async (idUsuario) => {
    const PROCESS_RESULT = {success: false, message: 'Ocurrio un error, al eliminar la Cita, intentelo de nuevo o comunicate con soporte.'}
    let conn = await mysqlConnPool.getConnection();
    try {       
        console.log(idUsuario);
        
        const accountDeleted = await UsuarioEntity.userDeleteCita(conn, idUsuario);
            
        if (accountDeleted) {
            PROCESS_RESULT.success = true;
            PROCESS_RESULT.message = "Tu Cita ha sido eliminada correctamente."
            return PROCESS_RESULT;   
        }        
        return PROCESS_RESULT; 

    } catch (error) {
        throw error;
    } finally {
        conn?.release();
    }
};