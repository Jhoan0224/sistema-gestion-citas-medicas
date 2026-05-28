import { SERVER_ERROR, NOT_FOUND } from '../../utils/http-status-messages.js';
import * as adminSvc from '../../services/admin_svc/admin.svc.js'
import { createUserAccount, agendarCitaUsuario } from '../../services/usuario_svc/user-account.svc.js';
import {updateUserSysAccount} from '../../services/system_svc/system.svc.js'

export const searchNormalUserCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        // if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
        //     return res.status(403).json(FORBIDDEN_STATUS);
        // }        
        const processResult = await adminSvc.searchNormalUserSvc(req.body);
            console.log(processResult);
               
        return processResult.success === true 
            ? res.status(200).json(processResult)
            : res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller searchUserCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const deleteNormalUserAccountCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        // if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
        //     return res.status(403).json(FORBIDDEN_STATUS);
        // }        
        const processResult = await adminSvc.deleteNormalUserAccountSvc(req.body);
            console.log(processResult);
               
        return processResult.success === true 
            ? res.status(200).json(processResult)
            : res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller deleteNormalUserAccountCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const deleteUserSysAccountCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        // if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
        //     return res.status(403).json(FORBIDDEN_STATUS);
        // }        
        const processResult = await adminSvc.deletelUserSysAccountSvc(req.body);
            console.log(processResult);
               
        return processResult.success === true 
            ? res.status(200).json(processResult)
            : res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller deleteUserSysAccountCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const searchUserSysCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        // if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
        //     return res.status(403).json(FORBIDDEN_STATUS);
        // }        
        const processResult = await adminSvc.searchUserSysSvc(req.body);
            console.log(processResult);
               
        return processResult.success === true 
            ? res.status(200).json(processResult)
            : res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller searchUserCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const tableInfoCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        // if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
        //     return res.status(403).json(FORBIDDEN_STATUS);
        // }
        console.log(req.params.tableName);
        
        const processResult = await adminSvc.getTableInfoSvc(req.params.tableName);
            console.log(processResult);
               
        return processResult.success === true 
            ? res.status(200).json(processResult)
            : res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller searchUserCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const userSysAccountDataCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        // if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
        //     return res.status(403).json(FORBIDDEN_STATUS);
        // }
        
        const processResult = await adminSvc.userSysAccountDataSvc(req.params.idUsuario);
               
        return processResult.success === true 
            ? res.status(200).json(processResult)
            : res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller userAccountDataCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const createUserSysAccountCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        // if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
        //     return res.status(403).json(FORBIDDEN_STATUS);
        // }
        
        const processResult = await adminSvc.createUserSysAccountSvc(req.body);
               
        return processResult.success === true 
            ? res.status(200).json(processResult)
            : res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller createUserSysAccountCtrl ERROR >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const updateUserAccountCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        // if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
        //     return res.status(403).json(FORBIDDEN_STATUS);
        // }
        
        const processResult = await updateUserSysAccount(req.body);
               
        return processResult.success === true 
            ? res.status(200).json(processResult)
            : res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller searchUserCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};