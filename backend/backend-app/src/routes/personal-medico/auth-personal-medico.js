import express from 'express';
import { persMedLoginValidations } from '../../middleware/personal-med-auth.middleware.js';
import { persMedLoginCtrl, persMedVerifyLoginCtrl } from '../../controller/personal_medico_ctrl/personal-med-auth.controller.js';

const personalMedAuthRouter = express.Router();
personalMedAuthRouter.use(express.json());


personalMedAuthRouter.post("/login-personal-medico",
    persMedLoginValidations,
    persMedLoginCtrl    
);

personalMedAuthRouter.get("/verify-login-personal-medico",
    persMedVerifyLoginCtrl
);


export default personalMedAuthRouter;