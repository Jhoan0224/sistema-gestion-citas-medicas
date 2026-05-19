import { SERVER_ERROR, NOT_FOUND } from '../../utils/http-status-messages.js';
import * as adminSvc from '../../services/admin_svc/admin.svc.js'
import { createUserAccount, agendarCitaUsuario } from '../../services/usuario_svc/user-account.svc.js';



export const searchUserSysCtrl = async (req, res) => {
    const ROLES_REQUERIDOS = ["USUARIO"];
    try {
        // if (hasRolesRequeridos(req.params.userData.roles, ROLES_REQUERIDOS) === false) {
        //     return res.status(403).json(FORBIDDEN_STATUS);
        // }
        console.log("OK 1");
        
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
