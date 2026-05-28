import { SERVER_ERROR } from '../utils/http-status-messages.js';
import * as persMedValidations from '../utils/validations/personal-med.validations.js'
import { formCrearCuenta, formAgendarCitaUsuario, formUpdateCuenta, formUpdateUserNormalCuenta } from '../utils/validations/user-account.validation.js';

export const searchUserValidations = (req, res, next) => {
    try {
        const validationResult = persMedValidations.formSearchUser(req.body);
        
        return validationResult.success 
            ?  next() 
            : res.status(400).json(validationResult);

    } catch (error) {
        console.error("Error en middlware searchUserValidations >> " + error.stack);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const agendarCitaUserValidations = (req, res, next) => {
    try {
        const validationResult = formAgendarCitaUsuario(req.body);
        
        return validationResult.success 
            ?  next() 
            : res.status(400).json(validationResult);

    } catch (error) {
        console.error("Error en middlware agendarCitaUserValidationsPersMed >> " + error.stack);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const createUserAccountValidations = (req, res, next) => {
    try {        
        const validationResult = formCrearCuenta(req.body);
        
        return validationResult.success 
            ?  next() 
            : res.status(400).json(validationResult);

    } catch (error) {
        console.error("Error en middlware createUserAccountValidationsPersMed >> " + error.stack);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const updateUserAccountValidations = (req, res, next) => {
    try {        
        const validationResult = formUpdateUserNormalCuenta(req.body);
        
        return validationResult.success 
            ?  next() 
            : res.status(400).json(validationResult);

    } catch (error) {
        console.error("Error en middlware createUserAccountValidationsPersMed >> " + error.stack);
        return res.status(500).json(SERVER_ERROR);
    }
};