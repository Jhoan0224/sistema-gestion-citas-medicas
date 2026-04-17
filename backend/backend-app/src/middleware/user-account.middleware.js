import { SERVER_ERROR, TOKEN_NOT_VALID } from '../utils/http-status-messages.js';
import * as userAccountValidations from '../utils/validations/user-account.validation.js'
import JwtToken from '../services/security_svc/jwt-token.svc.js';

export const userCrearCuentaValidations = (req, res, next) => {
    try {
        
        const validationResult = userAccountValidations.formCrearCuenta(req.body);

        return validationResult.success
            ?  next()
            : res.status(400).json(validationResult);

    } catch (error) {
        console.error("Error en middlware userCrearCuentaValidations >> " + error.stack);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const verifyAuthValidation = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        console.log(authHeader);
        const token = authHeader.split(" ")[1];

        const TOKEN_DECODED = await JwtToken.jwtVerfyDecoded(token);
        
        if (TOKEN_DECODED !== null) {
            // agregar parametros con id y roles de usuario, obtenidos del token decodificado
            req.params["userData"] = {
                id: TOKEN_DECODED.id,
                roles: TOKEN_DECODED.roles
            }

            return next();
        }
        return res.status(401).json(TOKEN_NOT_VALID);

    } catch (error) {
        console.error("Error en controller userCrearCuenta >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};
