

export class SystemUserQuery {

    static dataLoginByEmail = `
    SELECT us.id, us.email, us.pass_hash
    FROM
        usuario_sistema us
    WHERE
        us.email = ?
    `;
}

export class SystemUserSecQuery {
    
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