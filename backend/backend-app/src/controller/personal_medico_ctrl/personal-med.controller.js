import { SERVER_ERROR, NOT_FOUND } from '../../utils/http-status-messages.js';
import * as persMedSvc from '../../services/personal_medico_svc/pers-med.svc.js'
import { createUserAccount, agendarCitaUsuario, updateUserNormalAccount } from '../../services/usuario_svc/user-account.svc.js';
import { updateUserSysAccount } from '../../services/system_svc/system.svc.js';
export const searchUserCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        // if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
        //     return res.status(403).json(FORBIDDEN_STATUS);
        // }
        
        const processResult = await persMedSvc.searchUserSvc(req.body);
               
        return processResult.success === true 
            ? res.status(200).json(processResult)
            : res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller searchUserCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const agendarCitaUserCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        // if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
        //     return res.status(403).json(FORBIDDEN_STATUS);
        // }
        
        const processResult = await agendarCitaUsuario(req.body);
               
        return processResult.success === true 
            ? res.status(200).json(processResult)
            : res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller searchUserCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const createUserAccountCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        // if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
        //     return res.status(403).json(FORBIDDEN_STATUS);
        // }
        
        const processResult = await createUserAccount(req.body);
               
        return processResult.success === true 
            ? res.status(200).json(processResult)
            : res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller searchUserCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const updateUserNormalAccountCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        // if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
        //     return res.status(403).json(FORBIDDEN_STATUS);
        // }
        
        const processResult = await updateUserNormalAccount(req.body);
               
        return processResult.success === true 
            ? res.status(200).json(processResult)
            : res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller searchUserCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const agendaCitasHoyCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        // if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
        //     return res.status(403).json(FORBIDDEN_STATUS);
        // }
        
        const processResult = await persMedSvc.agendaCitasHoySvc();
               
        return processResult.success === true 
            ? res.status(200).json(processResult)
            : res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller agendaCitasHoyCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

// endpoint de configuracion de usuario
export const userAccountDataCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        // if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
        //     return res.status(403).json(FORBIDDEN_STATUS);
        // }
        
        const processResult = await persMedSvc.userAccountDataSvc(req.params.idUsuario);
               
        return processResult.success === true 
            ? res.status(200).json(processResult)
            : res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller userAccountDataCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};


export const userCitasAsistidasCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        // if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
        //     return res.status(403).json(FORBIDDEN_STATUS);
        // }
        
        const processResult = await persMedSvc.userCitasAsistidasSvc(req.params.idUsuario);
               
        return processResult.success === true 
            ? res.status(200).json(processResult)
            : res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller userCitasAsistidasCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const userCitasInasistidasCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        // if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
        //     return res.status(403).json(FORBIDDEN_STATUS);
        // }
        
        const processResult = await persMedSvc.userCitasInasistidasSvc(req.params.idUsuario);
               
        return processResult.success === true 
            ? res.status(200).json(processResult)
            : res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller userCitasInasistidasCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const userCitasCanceladasCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        // if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
        //     return res.status(403).json(FORBIDDEN_STATUS);
        // }
        
        const processResult = await persMedSvc.userCitasCanceladasSvc(req.params.idUsuario);
               
        return processResult.success === true 
            ? res.status(200).json(processResult)
            : res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller userCitasCanceladasCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const userCitaPendienteCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        // if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
        //     return res.status(403).json(FORBIDDEN_STATUS);
        // }
        
        const processResult = await persMedSvc.userCitaPendienteSvc(req.params.idUsuario);
               
        return processResult.success === true 
            ? res.status(200).json(processResult)
            : res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller userCitaPendienteCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};