import express from "express";
import { verifyAuthJWT } from '../services/security_svc/token.svc.js'
import * as systemRoutesCtrl from '../controller/system-routes.controller.js';

const systemRouter = express.Router();
systemRouter.use(express.json());

systemRouter.get('/current-user-profile/:idUser',
    verifyAuthJWT,
    systemRoutesCtrl.currentUserProfileCtrl
);

systemRouter.get('/list-signos-sintomas',
    verifyAuthJWT,
    systemRoutesCtrl.listSignosSintomasCtrl
);

systemRouter.get('/list-ocupaciones-condiciones',
    verifyAuthJWT,
    systemRoutesCtrl.listOcupacionesCondicionesCtrl
);

systemRouter.get('/list-roles-privilegios',
    verifyAuthJWT,
    systemRoutesCtrl.listRolesPrivilegiosCtrl
);

systemRouter.get('/list-roles',
    verifyAuthJWT,
    systemRoutesCtrl.listRolesCtrl
);

systemRouter.get('/list-permisos',
    verifyAuthJWT,
    systemRoutesCtrl.listPermisosCtrl
);


export default systemRouter;