import express from 'express';
import * as persMedMiddleware from '../../middleware/personal-med.middleware.js'
import * as persMedCtrl from '../../controller/personal_medico_ctrl/personal-med.controller.js'
import { verifyAuthJWT } from '../../services/security_svc/token.svc.js';


const personalMedRouter = express.Router();
personalMedRouter.use(express.json());

personalMedRouter.post("/search-user-form",
    verifyAuthJWT,
    persMedMiddleware.searchUserValidations,
    persMedCtrl.searchUserCtrl
);

personalMedRouter.post("/create-user-account",
    verifyAuthJWT,
    persMedMiddleware.createUserAccountValidations,
    persMedCtrl.searchUserCtrl
);

personalMedRouter.post("/agendar-cita-user",
    verifyAuthJWT,
    persMedMiddleware.agendarCitaUserValidations,
    persMedCtrl.createUserAccountCtrl
);


export default personalMedRouter;