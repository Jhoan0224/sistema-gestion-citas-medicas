import express from 'express';
import { adminLoginValidations } from '../../middleware/admin-auth.middleware.js';
import { adminLoginCtrl, adminVerifyLoginCtrl } from '../../controller/admin_ctrl/admin-auth.controller.js';

const adminAuthRouter = express.Router();
adminAuthRouter.use(express.json());


adminAuthRouter.post("/login-admin",
    adminLoginValidations,
    adminLoginCtrl
);

adminAuthRouter.get("/verify-login-admin",
    adminVerifyLoginCtrl
);


export default adminAuthRouter;