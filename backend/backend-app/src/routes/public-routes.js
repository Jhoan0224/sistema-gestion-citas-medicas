import express from "express";
import * as publicRoutesCtrl from '../controller/public-routes.controller.js';


const publicRouter = express.Router();
publicRouter.use(express.json());


publicRouter.get('/sintomas-list',
    publicRoutesCtrl.sintomasList
);

publicRouter.get('/signos-list',
    publicRoutesCtrl.signosList
);

publicRouter.get('/departamentos-list',
    publicRoutesCtrl.departamentosList
);

publicRouter.get('/ocupaciones-list',
    publicRoutesCtrl.ocupacionesList
);

publicRouter.get('/condiciones-list',
    publicRoutesCtrl.condicionesList
);

export default publicRouter;