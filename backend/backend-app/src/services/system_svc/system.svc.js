import { mysqlConnPool } from "../../config/databases/mysql.js"
import { SignosEntity, SintomasEntity } from "../../database/centro_salud_db/entity/signos-sintomas.entity.js";
import { RolesEntity, PrivilegiosEntity } from "../../database/centro_salud_db/entity/roles-permisos.entity.js";
import CondicionEntity from '../../database/centro_salud_db/entity/condiciones.entity.js'
import OcupacionEntity from '../../database/centro_salud_db/entity/ocupacion.entity.js'
import { SystemUserEntity } from "../../database/centro_salud_db/entity/system-user.entity.js";


export async function userCurrentProfileSvc(id) {
    const PROCESS_RESULT = {success: false, message: "", userProfile: {}};
    let conn = await mysqlConnPool.getConnection();
    try {       
        const profile = await SystemUserEntity.getCurrentUserProfileById(conn, id);
        const roles = await SystemUserEntity.getRolesUserById(conn, [id]);
        
        if (profile === null) {
            PROCESS_RESULT.message = "Ocurrio un error error al recuperar tu perfil.";
            return PROCESS_RESULT;
        }

        PROCESS_RESULT.message = "Perfil recuperado correctamente.";
        PROCESS_RESULT.success = true;
        PROCESS_RESULT.userProfile = {...profile, roles: roles.map(r => r.nombre)};
        return PROCESS_RESULT;
        
    } catch (error) {
        throw error;
    } finally {conn?.release();}
};

export async function listSignosSintomasSvc() {
    const PROCESS_RESULT = {success: false, signosList: [], sintomasList: []};
    let conn = await mysqlConnPool.getConnection();
    try {
        const signosList = await SignosEntity.signosList(conn);
        const sintomasList =  await SintomasEntity.sintomasList(conn);
        
        PROCESS_RESULT.success = true;
        PROCESS_RESULT.signosList = signosList;
        PROCESS_RESULT.sintomasList = sintomasList;
        return PROCESS_RESULT;
        
    } catch (error) {
        throw error;
    } finally {conn?.release();}
};

export async function listOcupacionesCondicionesSvc() {
    const PROCESS_RESULT = {success: false, ocupacionesList: [], condicionesList: []};
    let conn = await mysqlConnPool.getConnection();
    try {
        const ocupacionesList = await OcupacionEntity.ocupacionesList(conn);
        const condicionesList =  await CondicionEntity.condicionesList(conn);
        
        PROCESS_RESULT.success = true;
        PROCESS_RESULT.ocupacionesList = ocupacionesList;
        PROCESS_RESULT.condicionesList = condicionesList;
        return PROCESS_RESULT;
        
    } catch (error) {
        throw error;
    } finally {conn?.release();}
};

export async function listRolesSvc() {
    const PROCESS_RESULT = {success: false, rolesList: []};
    let conn = await mysqlConnPool.getConnection();
    try {
        const rolesList = await RolesEntity.getListRoles(conn);
        
        PROCESS_RESULT.success = true;
        PROCESS_RESULT.rolesList = rolesList;
        return PROCESS_RESULT;
        
    } catch (error) {
        throw error;
    } finally {conn?.release();}
};

export async function listPermisosSvc() {
    const PROCESS_RESULT = {success: false, permisosList: []};
    let conn = await mysqlConnPool.getConnection();
    try {
        const permisosList =  await PrivilegiosEntity.getListPrivilegios(conn)
        
        PROCESS_RESULT.success = true;
        PROCESS_RESULT.permisosList = permisosList;
        return PROCESS_RESULT;
        
    } catch (error) {
        throw error;
    } finally {conn?.release();}
};

export async function listRolesPrivilegiosSvc() {
    const PROCESS_RESULT = {success: false, rolesList: [], privilegiosList: []};
    let conn = await mysqlConnPool.getConnection();
    try {
        const rolesList = await RolesEntity.getListRoles(conn);
        const privilegiosList =  await PrivilegiosEntity.getListPrivilegios(conn);
        
        PROCESS_RESULT.success = true;
        PROCESS_RESULT.rolesList = rolesList;
        PROCESS_RESULT.privilegiosList = privilegiosList;
        return PROCESS_RESULT;
        
    } catch (error) {
        throw error;
    } finally {conn?.release();}
};