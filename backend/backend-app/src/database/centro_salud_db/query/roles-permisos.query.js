export class RolesQuery {
    
    static listRoles = `
    SELECT  r.id, r.nombre FROM rol
    `;

}

export class PermisosQuery {

    static listPermisos = `
    SELECT  p.id, p.nombre FROM privilegio
    `;

}