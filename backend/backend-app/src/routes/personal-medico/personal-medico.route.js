import express from 'express';
import * as persMedMiddleware from '../../middleware/personal-med.middleware.js'
import * as persMedCtrl from '../../controller/personal_medico_ctrl/personal-med.controller.js'
import { verifyAuthJWT } from '../../services/security_svc/token.svc.js';
import { agendarCitaUsuarioCtrl } from '../../controller/usuario_ctrl/user-account.controller.js';


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
    persMedCtrl.createUserAccountCtrl
);

personalMedRouter.post("/update-user-normal",
    verifyAuthJWT,
    persMedMiddleware.updateUserAccountValidations,
    persMedCtrl.updateUserNormalAccountCtrl
);


personalMedRouter.post("/agendar-cita-user",
    verifyAuthJWT,
    persMedMiddleware.agendarCitaUserValidations,
    agendarCitaUsuarioCtrl
);

personalMedRouter.get("/agenda-citas-hoy",
    verifyAuthJWT,
    persMedCtrl.agendaCitasHoyCtrl
);

// Endpint de coniguracion de usuarios
personalMedRouter.get("/usuario-account-data/:idUsuario",
    verifyAuthJWT,
    persMedCtrl.userAccountDataCtrl
);

personalMedRouter.get("/usuario-citas-asistidas/:idUsuario",
    verifyAuthJWT,
    persMedCtrl.userCitasAsistidasCtrl
);

personalMedRouter.get("/usuario-citas-inasistidas/:idUsuario",
    verifyAuthJWT,
    persMedCtrl.userCitasInasistidasCtrl
);

personalMedRouter.get("/usuario-citas-canceladas/:idUsuario",
    verifyAuthJWT,
    persMedCtrl.userCitasCanceladasCtrl
);

personalMedRouter.get("/usuario-cita-pendiente/:idUsuario",
    verifyAuthJWT,
    persMedCtrl.userCitaPendienteCtrl
);


export default personalMedRouter;