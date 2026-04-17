export default class UsuarioQuery {

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

    static findIdByEmail = `
    SELECT user.id FROM usuario user WHERE user.email = ?
    `;

    static findIdByDui = `
    SELECT user.id FROM usuario user WHERE user.dui = ?
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
        user.id_departamento, cond.nombre as condicion, ocup.nombre as ocupacion
    FROM
        usuario user
    JOIN
        condiciones cond on cond.id = user.id_condicion
    JOIN
        ocupaciones ocup on ocup.id = user.id_ocupacion
    WHERE
        user.id = ?
    `;
}

export class UsuarioSecurityQuery {

    static dataLoginByEmail = `
    SELECT user.id, user.pass_hash
    FROM
        usuario user
    WHERE user.email = ?
    `
}