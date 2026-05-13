import express from 'express';
import { verifyAuthJWT } from '../../services/security_svc/token.svc.js';

const adminRouter = express.Router();
adminRouter.use(express.json());


adminRouter.post("/search-user-form",
    verifyAuthJWT,
    persMedValidations.formSearchUser,
    persMedLoginCtrl    
);



export default adminRouter;