import {SERVER_ERROR, TOKEN_IS_VALID, TOKEN_NOT_VALID} from '../../utils/http-status-messages.js'
import JwtToken from '../../services/security_svc/jwt-token.svc.js';
import * as persMedSercuritySvc from '../../services/personal_medico_svc/pers-med-security.svc.js';


export const persMedVerifyLoginCtrl = async (req, res) => {
    try {        
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(" ")[1];

        const TOKEN_VERIFCATION = await JwtToken.jwtVerfyDecoded(token);

        return TOKEN_VERIFCATION === null
            ? res.status(401).json(TOKEN_NOT_VALID)
            : res.status(200).json(TOKEN_IS_VALID);

    } catch (error) {
        console.error("Error en controller adminVerifyLoginCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};

export const persMedLoginCtrl = async (req, res) => {
    try {
        const processResult = await persMedSercuritySvc.loginPersonalMed(req.body);

        if (processResult.success) {
            return res.status(200).json(processResult);
        }
        return res.status(400).json(processResult);

    } catch (error) {
        console.error("Error en controller persMedLoginCtrl >> " + error);
        return res.status(500).json(SERVER_ERROR);
    }
};