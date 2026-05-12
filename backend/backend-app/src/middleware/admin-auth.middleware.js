import { SERVER_ERROR } from "../utils/http-status-messages.js";
import * as adminAuthValidations from "../utils/validations/admin-auth.validations.js";

export const adminLoginValidations = (req, res, next) => {
    try {
        const validationResult = adminAuthValidations.formLoginAdmin(req.body);

        return validationResult.success
            ?  next()
            : res.status(400).json(validationResult);

    } catch (error) {
        console.error("Error en middlware personalMedLoginValidations >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};