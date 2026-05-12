import { SystemUserQuery, SystemUserSecQuery } from "../query/system-user.query.js";

export class SystemUserEntity {


    static async getCurrentUserProfileById(conn, id) {
        const [result] = await conn.execute(SystemUserSecQuery.currentUserProfileById, [id]);
        return result[0] ?? null;
    }
    
    static async getDataLoginByEmail(conn, values) {
        const [result] = await conn.execute(SystemUserSecQuery.dataLoginByEmail, values);      
        return result[0] ?? null;
    }

    static async getRolesUserById(conn, values) {
        const [result] = await conn.execute(SystemUserSecQuery.rolesByUserId, values);        
        return result.length === 0 ? null : result;
    }

}