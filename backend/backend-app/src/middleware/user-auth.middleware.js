import { SERVER_ERROR } from '../utils/http-status-messages.js';
import * as userAuthValidations from '../utils/validations/user-auth.validation.js'


export const userLoginValidations = (req, res, next) => {
    try {
        
        const validationResult = userAuthValidations.formLoginUsuario(req.body);

        return validationResult.success
            ?  next()
            : res.status(400).json(validationResult);

    } catch (error) {
        console.error("Error en middlware userCrearCuentaValidations >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

