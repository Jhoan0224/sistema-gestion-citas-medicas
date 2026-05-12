import { SERVER_ERROR } from "../utils/http-status-messages.js";
import * as persMedAuthValidations from "../utils/validations/personal-med-auth.validations.js";

export const persMedLoginValidations = (req, res, next) => {
    try {
        const validationResult = persMedAuthValidations.formLoginPersonalMed(req.body);

        return validationResult.success
            ?  next()
            : res.status(400).json(validationResult);

    } catch (error) {
        console.error("Error en middlware personalMedLoginValidations >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};