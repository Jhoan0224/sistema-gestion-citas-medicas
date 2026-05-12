import { mysqlConnPool } from "../../config/databases/mysql.js";
import { CREDENTIALS_NOT_VALID } from "../../utils/http-status-messages.js";
import JwtToken from "../security_svc/jwt-token.svc.js";
import PasswordSecurity from "../security_svc/password-security.js";
import { SystemUserEntity } from "../../database/centro_salud_db/entity/system-user.entity.js";


export async function loginAdmin(form) {
    let conn = await mysqlConnPool.getConnection();
    const PROCESS_RESULT = {success: false, message: '', id: '', token: ''};
    try {
        const [dataLogin] = await SystemUserEntity.getDataLoginByEmail(conn, [form.email]);

        if (dataLogin === null) { return CREDENTIALS_NOT_VALID }

        // Check the password matches 
        if (await PasswordSecurity.passwordMatches(form.pass, dataLogin.pass_hash) === false) {
            return CREDENTIALS_NOT_VALID;
        }

        // Get roles of the user
        const userRoles = await SystemUserEntity.getRolesUserById(conn, [dataLogin.id]);

        // build the Token payload
        const TOKEN_PAYLOAD = {
            id: dataLogin.id,
            roles: userRoles
        }
        const TOKEN = await JwtToken.generateJwt(TOKEN_PAYLOAD);

        PROCESS_RESULT.message = 'Inicio de sesion exitoso';
        PROCESS_RESULT.success = true;
        PROCESS_RESULT.id = dataLogin.id;
        PROCESS_RESULT.token = TOKEN;

        return PROCESS_RESULT;

    } catch (error) {
        throw error;
    } finally { conn?.release(); }
} 