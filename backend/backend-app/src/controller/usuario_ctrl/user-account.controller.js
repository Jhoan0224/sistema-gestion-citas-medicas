import {FORBIDDEN_STATUS, SERVER_ERROR} from '../../utils/http-status-messages.js'
import { citaPendienteUsuario, createUserAccount, usuarioAccountInfo, usuarioBasicInfo, userUpdateSecurityAccount } from '../../services/usuario_svc/user-account.svc.js';


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

export const citaPendienteUsuarioCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        if (hasRolesRequeridos(req.param.userData.roles, ROLES_REQUERIDOS) === false) {
            return res.status(403).json(FORBIDDEN_STATUS);
        }
       
        const processResult = await citaPendienteUsuario(req.param.id);

        if (processResult.success) {
            return res.status(200).json(processResult);
        }
        return res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller usuarioBasicInfo >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const userBasicInfoCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        const userData = req.params.userData;
        console.log(req.params.userData);
        if (hasRolesRequeridos(userData.roles, ROLES_REQUERIDOS) === false) {
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