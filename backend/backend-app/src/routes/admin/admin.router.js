import express from 'express';
import { verifyAuthJWT } from '../../services/security_svc/token.svc.js';
import * as adminValidations from '../../middleware/admin.middleware.js';
import * as adminCtrl from '../../controller/admin_ctrl/admin.controller.js'

const adminRouter = express.Router();
adminRouter.use(express.json());

adminRouter.get("/usuario-sys-account-data/:idUsuario",
    verifyAuthJWT,
    adminCtrl.userSysAccountDataCtrl
);

adminRouter.post("/search-user-form",
    verifyAuthJWT,
    adminValidations.searchUserSysValidations,
    adminCtrl.searchUserSysCtrl    
);

adminRouter.post("/create-user-sys",
    verifyAuthJWT,
    adminValidations.createUserSysAccountValidations,
    adminCtrl.createUserSysAccountCtrl    
);

adminRouter.post("/search-normal-user",
    verifyAuthJWT,
    adminValidations.searchNormalUserValidations,
    adminCtrl.searchNormalUserCtrl    
);

adminRouter.post("/delete-normal-user-account",
    verifyAuthJWT,
    adminCtrl.deleteNormalUserAccountCtrl    
);

adminRouter.post("/delete-user-system-account",
    verifyAuthJWT,
    adminCtrl.deleteUserSysAccountCtrl    
);

adminRouter.post("/update-user-account",
    verifyAuthJWT,
    adminValidations.updateUserAccountValidations,
    adminCtrl.updateUserAccountCtrl
);

adminRouter.get("/get-info-table/:tableName",
    // verifyAuthJWT,
    adminCtrl.tableInfoCtrl    
);




export default adminRouter;