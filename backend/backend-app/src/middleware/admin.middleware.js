import { SERVER_ERROR } from '../utils/http-status-messages.js';
import * as adminValidations from '../utils/validations/admin.validations.js';
import { formCrearCuenta, formAgendarCitaUsuario, formUpdateCuenta } from '../utils/validations/user-account.validation.js';

export const searchNormalUserValidations = (req, res, next) => {
    try {
        console.log("req.body");
        console.log(req.body);
        
        const validationResult = adminValidations.formSearchNormalUser(req.body);
        
        return validationResult.success 
            ?  next() 
            : res.status(400).json(validationResult);

    } catch (error) {
        console.error("Error en middlware searchUserSysValidationsAdmin >> " + error.stack);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const searchUserSysValidations = (req, res, next) => {
    try {
        console.log("req.body");
        console.log(req.body);
        
        const validationResult = adminValidations.formSearchUserSys(req.body);
        
        return validationResult.success 
            ?  next() 
            : res.status(400).json(validationResult);

    } catch (error) {
        console.error("Error en middlware searchUserSysValidationsAdmin >> " + error.stack);
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

export const createUserSysAccountValidations = (req, res, next) => {
    try {        
        const validationResult = adminValidations.formCreateUserSysAccount(req.body);
        
        return validationResult.success 
            ?  next() 
            : res.status(400).json(validationResult);

    } catch (error) {
        console.error("Error en middlware createUserAccountValidationsPersMed >> " + error.stack);
        return res.status(500).json(SERVER_ERROR);
    }
};

// don't used
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
        const validationResult = formUpdateCuenta(req.body);
        
        return validationResult.success 
            ?  next() 
            : res.status(400).json(validationResult);

    } catch (error) {
        console.error("Error en middlware updateUserAccountValidations >> " + error.stack);
        return res.status(500).json(SERVER_ERROR);
    }
};