export default class UsuarioQuery {

    static createAccount = `
    INSERT INTO
        usuario(dui, nombre, apellido, fecha_nacimiento, email, pass, zona_residencia, estado_laboral_formal, condicion_medica)
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
}

export class UsuarioSecurityQuery {

    static dataLoginByEmail = `
    SELECT user.id, user.pass
    FROM
        usuario user
    WHERE user.email = ?
    `
}