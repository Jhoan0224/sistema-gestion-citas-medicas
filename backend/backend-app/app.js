import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

// rutas de la API
import publicRouter from './src/routes/public-routes.js'
import userAccountRouter from './src/routes/usuario/usuario-account.js';
import userAuthRouter from './src/routes/usuario/auth-usuario.js';
import personalMedicoAuthRouter from './src/routes/personal-medico/auth-personal-medico.js'
import adminAuthRouter from './src/routes/admin/auth-admin.js'
import systemRouter from './src/routes/system-routes.js';
import personalMedRouter from './src/routes/personal-medico/personal-medico.route.js';
import adminRouter from './src/routes/admin/admin.router.js';

const app = express();
const logger = morgan;
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => { res.send("Centro de salud");});
app.use('/public', publicRouter);
app.use('/user', userAccountRouter);
app.use('/user', userAuthRouter);
app.use('/system', systemRouter);
app.use('/system-personal-medico', personalMedRouter);
app.use('/system-admin', adminRouter);
app.use('/system-auth', personalMedicoAuthRouter);
app.use('/system-auth', adminAuthRouter);

// catch 404 and forward to error handler
app.use(function(req, res) {
    res.status(404).json({
        status: 404,
        method: req.method,
        path: req.originalUrl,
        message: "Ruta no encontrada."
    });
});

export default app;