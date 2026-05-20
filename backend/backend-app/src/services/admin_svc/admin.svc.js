import { mysqlConnPool } from "../../config/databases/mysql.js";
import { CREDENTIALS_NOT_VALID } from "../../utils/http-status-messages.js";
import JwtToken from "../security_svc/jwt-token.svc.js";
import PasswordSecurity from "../security_svc/password-security.js";
import UsuarioEntity from "../../database/centro_salud_db/entity/usuario.entity.js";
import CitaEntity from "../../database/centro_salud_db/entity/cita.entity.js";
import { SystemUserEntity } from "../../database/centro_salud_db/entity/system-user.entity.js";
import { TableDbEntity } from "../../database/centro_salud_db/query/tables-db.entity.js";


export async function deletelUserSysAccountSvc(form) {
    let conn = await mysqlConnPool.getConnection();
    const PROCESS_RESULT = {success: false, message: "No se pudo Eliminar el usuario"};
    try {
        console.log(form);
        
        const deletedAccount = await SystemUserEntity.deleteUserSysByEmail(conn, form.email)
        console.log(deletedAccount);
        
        if (!deletedAccount) { return PROCESS_RESULT }
                
        PROCESS_RESULT.success = true;
        PROCESS_RESULT.message = "Usuario eliminado correctamente";
        return PROCESS_RESULT;

    } catch (error) {
        throw error;
    } finally { conn?.release(); }
} 

export async function deleteNormalUserAccountSvc(form) {
    let conn = await mysqlConnPool.getConnection();
    const PROCESS_RESULT = {success: false, message: "No se pudo Eliminar el usuario"};
    try {
        const deletedAccount = await UsuarioEntity.deleteUserByEmail(conn, form.email);
             console.log(deletedAccount);
        if (!deletedAccount) { return PROCESS_RESULT }
                
        PROCESS_RESULT.success = true;
        PROCESS_RESULT.message = "Usuario eliminado correctamente";
        return PROCESS_RESULT;

    } catch (error) {
        throw error;
    } finally { conn?.release(); }
} 

export async function searchNormalUserSvc(form) {
    let conn = await mysqlConnPool.getConnection();
    const PROCESS_RESULT = {success: false, userList: []};
    try {
        const filterAge = [10, 90];

        const searchQuery = {
            "DUI": (conn, values) => UsuarioEntity.findUserByDuiAndAge(conn, values),
            "EMAIL": (conn, values) => UsuarioEntity.findUserByEmailAndAge(conn, values),
            "FULLNAME": (conn, values) => UsuarioEntity.findUserByFullNameAndAge(conn, values)
        }
        const values = [`%${form.textSearch}%` ,...filterAge]
        const userList = await searchQuery[form.typeSearch](conn, values);
        if (userList.length === 0) { return PROCESS_RESULT }
        
        // Check the password matches
        if (userList.length === 0) { return PROCESS_RESULT }
        
        PROCESS_RESULT.success = true;
        PROCESS_RESULT.userList = userList;
        return PROCESS_RESULT;

    } catch (error) {
        throw error;
    } finally { conn?.release(); }
} 

export async function searchUserSysSvc(form) {
    let conn = await mysqlConnPool.getConnection();
    const PROCESS_RESULT = {success: false, userList: []};
    try {
        const searchQuery = {
            "DUI": (conn, values) => SystemUserEntity.findUserSysByDuiAndAge(conn, values),
            "EMAIL": (conn, values) => SystemUserEntity.findUserSysByEmailAndAge(conn, values),
            "FULLNAME": (conn, values) => SystemUserEntity.findUserSysByFullNameAndAge(conn, values)
        };

        const values = [`%${form.textSearch}%`, form.typeUser]
        const userList = await searchQuery[form.typeSearch](conn, values);
        
        // Check the password matches
        if (userList.length === 0) { return PROCESS_RESULT }
        
        PROCESS_RESULT.success = true;
        PROCESS_RESULT.userList = userList;
        return PROCESS_RESULT;

    } catch (error) {
        throw error;
    } finally { conn?.release(); }
} 

export async function getTableInfoSvc(tableName) {
    let conn = await mysqlConnPool.getConnection();
    const PROCESS_RESULT = {success: false, tableName: "", rows: [], fileds: []};
    try {        
        const tableInfoQuery = {
            "ESTADO_CITA": (conn) => TableDbEntity.getInfoTableEstadoCita(conn),
            "SIGNOS": (conn) => TableDbEntity.getInfoTableSignos(conn),
            "SINTOMAS": (conn) => TableDbEntity.getInfoTableSintomas(conn),
            "CONDICIONES": (conn) => TableDbEntity.getInfoTableCondiciones(conn),
            "OCUPACIONES": (conn) => TableDbEntity.getInfoTableOcupaciones(conn),
            "ESPECIALIDAD": (conn) => TableDbEntity.getInfoTableEspecialidad(conn),
            "ROLES": (conn) => TableDbEntity.getInfoTableRoles(conn),
            "PRIVILEGIOS": (conn) => TableDbEntity.getInfoTablePrivilegios(conn),
        };

        const [rows, fields] = await tableInfoQuery[tableName.trim().toUpperCase()](conn);
                
        PROCESS_RESULT.success = true;
        PROCESS_RESULT.rows = rows;
        PROCESS_RESULT.tableName = fields[0].table;
        PROCESS_RESULT.fileds = fields.map(f => f.name);
        return PROCESS_RESULT;

    } catch (error) {
        throw error;
    } finally { conn?.release(); }
}

export async function userSysAccountDataSvc(idUsuario) {
    let conn = await mysqlConnPool.getConnection();
    const PROCESS_RESULT = {success: false, message: "No se ha encontrado informacion", usuarioAccountInfo: {}};
    try {
        const userInfo = await SystemUserEntity.accountInfoById(conn, idUsuario);
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

export async function createUserSysAccountSvc(form) {
    let conn = await mysqlConnPool.getConnection();
    const PROCESS_RESULT = {success: false, message: "No se ha encontrado informacion", usuarioAccountInfo: {}};
    try {
        const userInfo = await SystemUserEntity.accountInfoById(conn, idUsuario);
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