import {FORBIDDEN_STATUS, SERVER_ERROR} from '../../utils/http-status-messages.js'
import { citaPendienteUsuario, createUserAccount, usuarioAccountInfo, usuarioBasicInfo, userUpdateSecurityAccount, usuarioInfoUpdateAccount, userUpdateDataAccount, userDeleteAccount, historialCitasAsistidasUsuario, historialCitasCanceladasUsuario, historialCitasInasistidasUsuario } from '../../services/usuario_svc/user-account.svc.js';


export const userUpdateSecurityAccountCtrl = async (req, res) => {
    try {
        const form = req.body;
        form.idUser = req.params.userData.id;

        const processResult = await userUpdateSecurityAccount(form);
        if (processResult.success) {
            return res.status(200).json(processResult);
        }
        return res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller userCrearCuenta >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const userCrearCuentaCtrl = async (req, res) => {
    try {
        const processResult = await createUserAccount(req.body);
        if (processResult.success) {
            return res.status(200).json(processResult);
        }
        return res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller userCrearCuenta >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const userUpdateInfoAccountCtrl = async (req, res) => {
    try {
        const processResult = await userUpdateDataAccount(req.body);
        if (processResult.success) {
            return res.status(200).json(processResult);
        }
        return res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller userUpdateInfoAccountCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const userDeleteAccountCtrl = async (req, res) => {
    try {
        const processResult = await userDeleteAccount(req.body);
        if (processResult.success) {
            return res.status(200).json(processResult);
        }
        return res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller userUpdateInfoAccountCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const historialCitasAsistidasUsuarioCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        
        if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
            return res.status(403).json(FORBIDDEN_STATUS);
        }
       
        const processResult = await historialCitasAsistidasUsuario(req.params.userData.id);

        if (processResult.success) {
            return res.status(200).json(processResult);
        }
        return res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller historialCitasAsistidasUsuarioCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const historialCitasCanceladasUsuarioCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        
        if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
            return res.status(403).json(FORBIDDEN_STATUS);
        }
       
        const processResult = await historialCitasCanceladasUsuario(req.params.userData.id);

        if (processResult.success) {
            return res.status(200).json(processResult);
        }
        return res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller historialCitasCanceladasUsuarioCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const historialCitasInasistidasUsuarioCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        
        if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
            return res.status(403).json(FORBIDDEN_STATUS);
        }
       
        const processResult = await historialCitasInasistidasUsuario(req.params.userData.id);

        if (processResult.success) {
            return res.status(200).json(processResult);
        }
        return res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller historialCitasInasistidasUsuarioCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const citaPendienteUsuarioCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        
        if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
            return res.status(403).json(FORBIDDEN_STATUS);
        }
       
        const processResult = await citaPendienteUsuario(req.params.userData.id);

        if (processResult.success) {
            return res.status(200).json(processResult);
        }
        return res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller citaPendienteUsuarioCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const userInfoUpdateAccountCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        const userData = req.params.userData;
        console.log(req.params.userData);
        if (hasRolesRequeridos(userData.roles, ROLES_REQUERIDOS) === false) {
            return res.status(403).json(FORBIDDEN_STATUS);
        }
       
        const processResult = await usuarioInfoUpdateAccount(req.params.id);

        if (processResult.success) {
            return res.status(200).json(processResult);
        }
        return res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller usuarioInfoUpdateAccount >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const userBasicInfoCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {

        if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
            return res.status(403).json(FORBIDDEN_STATUS);
        }
       
        const processResult = await usuarioBasicInfo(req.params.id);

        if (processResult.success) {
            return res.status(200).json(processResult);
        }
        return res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller usuarioBasicInfo >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const userAccountInfoCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        const userData = req.params.userData;
        console.log(req.params.userData);
        if (hasRolesRequeridos(userData.roles, ROLES_REQUERIDOS) === false) {
            return res.status(403).json(FORBIDDEN_STATUS);
        }
       
        const processResult = await usuarioAccountInfo(req.params.id);

        return processResult.success
            ? res.status(200).json(processResult)
            : res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller usuariAccountInfo >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};



function hasRolesRequeridos(rolesUsuario, rolesRequeridos) {

    return rolesRequeridos.every(rolRequerido => rolesUsuario.includes(rolRequerido));
}