import express from 'express';

const adminRouter = express.Router();
adminRouter.use(express.json());


adminRouter.post("/search-user-form",
    persMedValidations.formSearchUser,
    persMedLoginCtrl    
);



export default adminRouter;