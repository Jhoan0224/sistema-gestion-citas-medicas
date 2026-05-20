

export class SystemUserQuery {

    static dataLoginByEmail = `
    SELECT us.id, us.email, us.pass_hash
    FROM
        usuario_sistema us
    WHERE
        us.email = ?
    `;

    static findIdByEmailAndAge = `
    SELECT
        user.id, user.dui, user.nombre, user.apellido, user.fecha_nacimiento, user.email 
    FROM
        usuario_sistema user
    JOIN
        rol_usuario_sistema rus ON rus.id_usuario_sistema = user.id
    JOIN
        rol r ON r.id = rus.id_rol
    WHERE
        user.email LIKE ? AND
        r.nombre = ?
    `;

    static findIdByDuiAndAge = `
    SELECT
        user.id, user.dui, user.nombre, user.apellido, user.fecha_nacimiento, user.email 
    FROM
        usuario_sistema user
    JOIN
        rol_usuario_sistema rus ON rus.id_usuario_sistema = user.id
    JOIN
        rol r ON r.id = rus.id_rol
    WHERE
        user.dui LIKE ? AND
        r.nombre = ?
    `;

    static findIdByFullNameAndAge = `
    SELECT
        user.id, user.dui, user.nombre, user.apellido, user.fecha_nacimiento, user.email 
    FROM
        usuario_sistema user
    JOIN
        rol_usuario_sistema rus ON rus.id_usuario_sistema = user.id
    JOIN
        rol r ON r.id = rus.id_rol
    WHERE
        CONCAT(user.nombre, ' ',user.apellido) LIKE ? AND
        r.nombre = ?
    `;

}

export class SystemUserSecQuery {
    
    static createUserSysAccount = `
    INSERT INTO 
        usuario_sistema(dui, nombre, apellido, email, fecha_nacimiento, zona_residencia)
    VALUES 
        (?, ?, ?, ?, ?, ?)
    `;

    static privilgiosUserSytem = `
    INSERT INTO 
        privilegio_usuario_sistema(id_privilegio, id_usuario_sistema)
    VALUES 
        (?, ?)
    `;

    static rolUserSytem = `
    INSERT INTO 
        rol_usuario_sistema(id_rol, id_usuario_sistema)
    VALUES 
        (?, ?)
    `;

    static usuarioAccountInfo = `
    SELECT user.id, user.dui, user.nombre, user.apellido, user.email, user.fecha_nacimiento,
        user.zona_residencia
    FROM
        usuario_sistema user
    WHERE
        user.id = ?
    `;

    static deleteByEmail = `
    DELETE FROM usuario_sistema us WHERE us.email = ?
    `;

    static currentUserProfileById = `
    SELECT
        us.id, us.nombre, us.apellido, us.dui, us.fecha_nacimiento, us.email, us.zona_residencia
    FROM
        usuario_sistema us
    WHERE
        us.id = ?
    `;

    static dataLoginByEmail = `
    SELECT us.id, us.email, us.pass_hash
    FROM
        usuario_sistema us
    WHERE
        us.email = ?
    `;

    static rolesByUserId = `
    SELECT 
        r.id, r.nombre FROM rol r
    INNER JOIN
        rol_usuario_sistema rus on rus.id_rol = r.id
    WHERE
        rus.id_usuario_sistema  = ?
    `;


}