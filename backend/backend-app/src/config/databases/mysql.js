import * as dotenv from 'dotenv';
import mysql from "mysql2/promise"

dotenv.config();

// coneccion para mysqlPool
export const mysqlConnPool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USEER,
    password: process.env.DB_PASS,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, 
    idleTimeout: 60000, 
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});