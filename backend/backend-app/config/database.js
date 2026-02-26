import mysql from "mysql2/promise.js"

// coneccion para mysqlPool
export const connPool = mysql.createPool({
    host: 'localhost',
    user: '', // poner pass
    database: 'centro_salud_db',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, 
    idleTimeout: 60000, 
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});