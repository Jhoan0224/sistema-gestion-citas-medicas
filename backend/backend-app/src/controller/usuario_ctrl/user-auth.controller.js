import {SERVER_ERROR, TOKEN_IS_VALID, TOKEN_NOT_VALID} from '../../utils/http-status-messages.js'
import * as userSercuritySvc from '../../services/usuario_svc/user-security.svc.js';
import JwtToken from '../../services/security_svc/jwt-token.svc.js';


export const verifyTokenCtrl = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        console.log(authHeader);
        const token = authHeader.split(" ")[1];

        const TOKEN_VERIFCATION = await JwtToken.jwtVerfyDecoded(token);
        
        if (TOKEN_VERIFCATION !== null) {
            return res.status(200).json(TOKEN_IS_VALID);
        }
        return res.status(401).json(TOKEN_NOT_VALID);

    } catch (error) {
        console.error("Error en controller userCrearCuenta >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const userLoginCtrl = async (req, res) => {
    try {
        const processResult = await userSercuritySvc.loginUsuario(req.body);

        if (processResult.success) {
            return res.status(200).json(processResult);
        }
        return res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller userCrearCuenta >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};