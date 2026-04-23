import express from "express";
import * as userAccountMiddleWare from '../../middleware/user-account.middleware.js'
import * as userAccountCtrl from '../../controller/usuario_ctrl/user-account.controller.js'
import userAuthRouter from "./auth-usuario.js";

const userAccountRouter = express.Router();
userAccountRouter.use(express.json());


userAccountRouter.post('/delete-user-account',
    userAccountMiddleWare.verifyAuthValidation,
    userAccountMiddleWare.userDeleteAccountValidations,
    userAccountCtrl.userDeleteAccountCtrl
);

userAccountRouter.post('/update-info-account',
    userAccountMiddleWare.verifyAuthValidation,
    userAccountMiddleWare.userUpdateInfoAccountValidations,
    userAccountCtrl.userUpdateInfoAccountCtrl
);

userAccountRouter.post('/update-info-account',
    userAccountMiddleWare.verifyAuthValidation,
    userAccountMiddleWare.userUpdateInfoAccountValidations,
    userAccountCtrl.userUpdateInfoAccountCtrl
);

userAccountRouter.post('/update-security-account',
    userAccountMiddleWare.verifyAuthValidation,
    userAccountMiddleWare.userUpdateSecurityValidations,
    userAccountCtrl.userUpdateSecurityAccountCtrl
);

userAccountRouter.post('/create-account',
    userAccountMiddleWare.userCrearCuentaValidations,
    userAccountCtrl.userCrearCuentaCtrl
);

userAuthRouter.get('/info-update-account/user-id/:id',
    userAccountMiddleWare.verifyAuthValidation,
    userAccountCtrl.userInfoUpdateAccountCtrl
);

userAuthRouter.get('/basic-info/user-id/:id',
    userAccountMiddleWare.verifyAuthValidation,
    userAccountCtrl.userBasicInfoCtrl
);

userAuthRouter.get('/cita-pendiente/user-id/:id',
    userAccountMiddleWare.verifyAuthValidation,
    userAccountCtrl.userBasicInfoCtrl
);

userAuthRouter.get('/account-info/user-id/:id',
    userAccountMiddleWare.verifyAuthValidation,
    userAccountCtrl.userAccountInfoCtrl
);

export default userAccountRouter;