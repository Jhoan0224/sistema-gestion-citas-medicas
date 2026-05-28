export default class UsuarioQuery {


    static deleteByEmail = `
    DELETE FROM usuario us WHERE us.email = ?
    `;
    
    static createAccount = `
    INSERT INTO
        usuario(dui, nombre, apellido, fecha_nacimiento, email, pass_hash, zona_residencia, id_ocupacion, id_condicion)
    VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    static findById = `
    SELECT user.id, user.dui, user.nombre, user.apellido, user.fecha_nacimiento, user.email, 
        user.zona_residencia, user.estado_laboral_formal, user.condicion_medica
    FROM 
        usuario user
    WHERE
        user.id = ?
    `;

    static findIdByEmailAndAge = `
    SELECT
        user.id, user.dui, user.nombre, user.apellido, user.fecha_nacimiento, user.email 
    FROM
        usuario user
    WHERE
        user.email LIKE ? AND
        TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) BETWEEN (? - 10) AND (? + 10)
    `;

    static findIdByDuiAndAge = `
    SELECT
        user.id, user.dui, user.nombre, user.apellido, user.fecha_nacimiento, user.email 
    FROM
        usuario user
    WHERE
        user.dui LIKE ? AND
        TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) BETWEEN (? - 10) AND (? + 10)
    `;

    static findIdByFullName = `
    SELECT
        user.id, user.dui, user.nombre, user.apellido, user.fecha_nacimiento, user.email 
    FROM
        usuario user
    WHERE
        CONCAT(user.nombre, ' ',user.apellido) LIKE ?
    `;

    static findIdByFullNameAndAge = `
    SELECT
        user.id, user.dui, user.nombre, user.apellido, user.fecha_nacimiento, user.email 
    FROM
        usuario user
    WHERE
        CONCAT(user.nombre, ' ',user.apellido) LIKE ? AND
        TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) BETWEEN (? - 10) AND (? + 10)
    `;

    static findIdByEmail = `
    SELECT user.id FROM usuario user WHERE user.email = ?
    `;

    static findIdByDui = `
    SELECT user.id FROM usuario user WHERE user.dui = ?
    `;
        
    static usuarioInfoUpdateAccount = `
    SELECT user.id, user.dui, user.nombre, user.apellido, user.fecha_nacimiento,
        user.zona_residencia, cond.id as idCondicion, ocup.id as idOcupacion
    FROM
        usuario user
    JOIN
        condiciones cond on cond.id = user.id_condicion
    JOIN
        ocupaciones ocup on ocup.id = user.id_ocupacion
    WHERE
        user.id = ?
    `;

    static usuarioInfoBasica = `
    SELECT user.id, user.dui, user.nombre, user.apellido, user.email
    FROM
        usuario user
    WHERE
        user.id = ?
    `;

    static usuarioAccountInfo = `
    SELECT user.id, user.dui, user.nombre, user.apellido, user.email, user.fecha_nacimiento,
        user.zona_residencia, cond.nombre as condicion, ocup.nombre as ocupacion
    FROM
        usuario user
    JOIN
        condiciones cond on cond.id = user.id_condicion
    JOIN
        ocupaciones ocup on ocup.id = user.id_ocupacion
    WHERE
        user.id = ?
    `;

    static updateUsuarioAccountByEmail = `
    UPDATE usuario user
        SET user.nombre = ?, user.apellido = ?, user.fecha_nacimiento = ?,
        user.zona_residencia = ?, user.id_condicio = ?n, user.id_ocupacion = ?
    WHERE
        user.email = ?
    `;
}

export class UsuarioSecurityQuery {

    static dataLoginByEmail = `
    SELECT user.id, user.pass_hash
    FROM
        usuario user
    WHERE user.email = ?
    `;

    static passHashByEmail = `
    SELECT user.pass_hash
    FROM
        usuario user
    WHERE user.email = ?
    `;

    static updateCredentialsPass = `
    UPDATE usuario SET email = ? WHERE id = ?
    `;

    static updateCredentialsPass = `
    UPDATE usuario SET pass_hash = ? WHERE id = ?
    `;

    static updateCredentialsEmailPass = `
    UPDATE usuario SET email = ?, pass_hash = ? WHERE id = ?
    `;

    static updateDataAccountById = `
    UPDATE usuario 
        SET dui = ?, nombre = ?, apellido = ?, fecha_nacimiento = ?, zona_residencia = ?, 
        id_condicion = ?, id_ocupacion = ?
    WHERE id = ?
    `;

    static deleteAccountByEmail = `
    DELETE FROM usuario WHERE email = ?
    `;

    static deleteCitaByUserId = `
    DELETE FROM cita ct WHERE ct.id_usuario = ?
    `;
}