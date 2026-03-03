import mysql from "mysql2/promise"

// coneccion para mysqlPool
export const mysqlConnPool = mysql.createPool({
    host: 'localhost',
    database: 'centro_salud_db',
    user: 'admin_centro_salud',
    password: 'CentroSalud2023',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, 
    idleTimeout: 60000, 
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});