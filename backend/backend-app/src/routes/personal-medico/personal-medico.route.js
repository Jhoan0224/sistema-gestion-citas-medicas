import express from 'express';
import * as persMedMiddleware from '../../middleware/personal-med.middleware.js'
import * as persMedCtrl from '../../controller/personal_medico_ctrl/personal-med.controller.js'


const personalMedRouter = express.Router();
personalMedRouter.use(express.json());


personalMedRouter.post("/search-user-form",
    persMedMiddleware.searchUserValidations,
    persMedCtrl.searchUserCtrl
);

personalMedRouter.post("/create-user-account",
    persMedMiddleware.createUserAccountValidations,
    persMedCtrl.searchUserCtrl
);

personalMedRouter.post("/agendar-cita-user",
    persMedMiddleware.agendarCitaUserValidations,
    persMedCtrl.createUserAccountCtrl
);


export default personalMedRouter;