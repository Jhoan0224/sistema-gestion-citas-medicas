import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

// rutas de la API
import userAccountRouter from './src/routes/usuario/usuario-account.js';
import userAuthRouter from './src/routes/usuario/auth-usuario.js';
import publicRouter from './src/routes/public-routes.js'

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

app.use('/user', userAccountRouter);
app.use('/user', userAuthRouter);
app.use('/public', publicRouter);

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