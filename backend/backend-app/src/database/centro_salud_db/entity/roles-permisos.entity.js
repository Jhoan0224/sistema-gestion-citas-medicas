import { RolesQuery, PermisosQuery } from "../query/roles-permisos.query.js"

export class RolesEntity {

    static async getListRoles(conn) {
        const [result] = await conn.execute(RolesQuery.listRoles);
        return result;
    }
}

export class PrivilegiosEntity {

    static async getListPrivilegios(conn) {
        const [result] = await conn.execute(PermisosQuery.listPermisos);
        return result;
    }
}