import express from "express";
import * as userAuthMiddleware from '../../middleware/user-auth.middleware.js'
import * as userAuthCtrl from '../../controller/usuario_ctrl/user-auth.controller.js'


const userAuthRouter = express.Router();
userAuthRouter.use(express.json());

userAuthRouter.get('/validar-token-user',
    userAuthCtrl.verifyTokenCtrl
);

userAuthRouter.post('/user-login',
    userAuthMiddleware.userLoginValidations,
    userAuthCtrl.userLoginCtrl
);

export default userAuthRouter;