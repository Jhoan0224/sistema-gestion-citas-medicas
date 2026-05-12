import { SERVER_ERROR, NOT_FOUND } from '../../utils/http-status-messages.js';
import * as persMedSvc from '../../services/personal_medico_svc/pers-med.svc.js'
import { createUserAccount, agendarCitaUsuario } from '../../services/usuario_svc/user-account.svc.js';

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