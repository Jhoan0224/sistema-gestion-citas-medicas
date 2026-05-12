import { mysqlConnPool } from "../../config/databases/mysql.js";
import { CREDENTIALS_NOT_VALID } from "../../utils/http-status-messages.js";
import JwtToken from "../security_svc/jwt-token.svc.js";
import PasswordSecurity from "../security_svc/password-security.js";
import UsuarioEntity from "../../database/centro_salud_db/entity/usuario.entity.js";

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