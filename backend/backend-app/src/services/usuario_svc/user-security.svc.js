import { mysqlConnPool } from "../../config/databases/mysql.js";
import { UsuarioSecurityQuery } from "../../database/centro_salud_db/query/usuario.query.js";
import { CREDENTIALS_NOT_VALID } from "../../utils/http-status-messages.js";
import JwtToken from "../security_svc/jwt-token.svc.js";
import PasswordSecurity from "../security_svc/password-security.js";

export async function loginUsuario(formAuth) {
    let conn = await mysqlConnPool.getConnection();
    const PROCESS_RESULT = {success: false, message: '', id: '', token: ''};
    try {
        console.log(formAuth);
        const [dataUserLogin] = await conn.execute(UsuarioSecurityQuery.dataLoginByEmail, [formAuth.email]);

        if (dataUserLogin.length === 0) {
            return CREDENTIALS_NOT_VALID;
        }
        console.log(dataUserLogin[0]);
        if (await PasswordSecurity.passwordMatches(formAuth.pass, dataUserLogin[0].pass_hash) === false) {
            return CREDENTIALS_NOT_VALID;
        }

        // build the Token payload
        const DEFAULT_USUARIO_ROL = ["USUARIO"];
        const TOKEN_PAYLOAD = {
            id: dataUserLogin[0].id,
            roles: DEFAULT_USUARIO_ROL
        }
        const TOKEN = await JwtToken.generateJwt(TOKEN_PAYLOAD);

        PROCESS_RESULT.success = true;
        PROCESS_RESULT.message = 'Inicio de sesion exitoso';
        PROCESS_RESULT.id = dataUserLogin[0].id;
        PROCESS_RESULT.token = TOKEN;

        return PROCESS_RESULT;

    } catch (error) {
        throw error;
    } finally {conn?.release();}
} 