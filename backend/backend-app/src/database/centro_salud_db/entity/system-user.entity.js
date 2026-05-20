import { SystemUserQuery, SystemUserSecQuery } from "../query/system-user.query.js";

export class SystemUserEntity {

    static async deleteUserSysByEmail(conn, email) {
        const [result] = await conn.execute(SystemUserSecQuery.deleteByEmail, [email]);
        return result.affectedRows > 0;
    }

    static async createUserSysAccount(conn, values) {
        const [result] = await conn.execute(SystemUserSecQuery.createUserSysAccount, values);        
        return result.affectedRows ?? null;
    }
    static async createPrivilegioUserSysAccount(conn, values) {
        const [result] = await conn.execute(SystemUserSecQuery.privilgiosUserSytem, values);        
        return result.affectedRows ?? null;
    }
    static async createRolUserSysAccount(conn, values) {
        const [result] = await conn.execute(SystemUserSecQuery.rolUserSytem, values);        
        return result.affectedRows ?? null;
    }


    static async accountInfoById(conn, id) {
        const [result] = await conn.execute(SystemUserSecQuery.usuarioAccountInfo, [id]);
        
        return result[0] ?? null;
    }

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

    // ------
    static async findUserSysByFullNameAndAge(conn, values) {
        const [result] = await conn.execute(SystemUserQuery.findIdByFullNameAndAge, values);
        return result;
    }

    static async findUserSysByEmailAndAge(conn, values) {        
        const [result] = await conn.execute(SystemUserQuery.findIdByEmailAndAge, values);
        return result;
    }

    static async findUserSysByDuiAndAge(conn, values) {
        const [result] = await conn.execute(SystemUserQuery.findIdByDuiAndAge, values);
        return result;
    }

}