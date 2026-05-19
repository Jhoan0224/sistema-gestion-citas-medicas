import { mysqlConnPool } from "../../config/databases/mysql.js";
import { CREDENTIALS_NOT_VALID } from "../../utils/http-status-messages.js";
import JwtToken from "../security_svc/jwt-token.svc.js";
import PasswordSecurity from "../security_svc/password-security.js";
import UsuarioEntity from "../../database/centro_salud_db/entity/usuario.entity.js";
import CitaEntity from "../../database/centro_salud_db/entity/cita.entity.js";
import { SystemUserEntity } from "../../database/centro_salud_db/entity/system-user.entity.js";




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