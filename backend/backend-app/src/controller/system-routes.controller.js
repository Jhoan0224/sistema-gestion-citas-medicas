import { NOT_FOUND, SERVER_ERROR, FORBIDDEN_STATUS } from "../utils/http-status-messages.js";
import * as systemSvc from '../services/system_svc/system.svc.js';

export const currentUserProfileCtrl = async (req, res) => {
    try {
        const ID_USER_TOKEN = req.user.id;
        if (Number(req.params.idUser) !== Number(ID_USER_TOKEN)) {
            return res.status(401).json(FORBIDDEN_STATUS);
        }

        const processResult = await systemSvc.userCurrentProfileSvc(req.params.idUser);
        console.log(processResult);
        
        processResult.success === true
            ? res.status(200).json(processResult)
            : res.status(404).json(NOT_FOUND);
        
    } catch (error) {
        console.log('error en currentUserProfileCtrl' + error);
        return res.status(500).json(SERVER_ERROR);   
    }
};

export const listRolesCtrl = async (req, res) => {
    try {
        const processResult = await systemSvc.listRolesSvc();

        processResult.success === true
            ? res.status(200).json(processResult)
            : res.status(404).json(NOT_FOUND);
        
    } catch (error) {
        console.log('error en currentUserProfileCtrl');
        return res.status(500).json(SERVER_ERROR);   
    }
};

export const listPermisosCtrl = async (req, res) => {
    try {
        const processResult = await systemSvc.listPermisosSvc();

        processResult.success === true
            ? res.status(200).json(processResult)
            : res.status(404).json(NOT_FOUND);
        
    } catch (error) {
        console.log('error en currentUserProfileCtrl');
        return res.status(500).json(SERVER_ERROR);   
    }
};

export const listOcupacionesCondicionesCtrl = async (req, res) => {
    try {
        const processResult = await systemSvc.listOcupacionesCondicionesSvc();

        processResult.success === true
            ? res.status(200).json(processResult)
            : res.status(404).json(NOT_FOUND);
        
    } catch (error) {
        console.log('error en currentUserProfileCtrl');
        return res.status(500).json(SERVER_ERROR);   
    }
};

export const listSignosSintomasCtrl = async (req, res) => {
    try {
        const processResult = await systemSvc.listSignosSintomasSvc();

        processResult.success === true
            ? res.status(200).json(processResult)
            : res.status(404).json(NOT_FOUND);
        
    } catch (error) {
        console.log('error en currentUserProfileCtrl');
        return res.status(500).json(SERVER_ERROR);   
    }
};