import express from 'express';
import { verifyAuthJWT } from '../../services/security_svc/token.svc.js';
import * as adminValidations from '../../middleware/admin.middleware.js';
import * as adminCtrl from '../../controller/admin_ctrl/admin.controller.js'

const adminRouter = express.Router();
adminRouter.use(express.json());


adminRouter.post("/search-user-form",
    verifyAuthJWT,
    adminValidations.searchUserSysValidations,
    adminCtrl.searchUserSysCtrl    
);



export default adminRouter;