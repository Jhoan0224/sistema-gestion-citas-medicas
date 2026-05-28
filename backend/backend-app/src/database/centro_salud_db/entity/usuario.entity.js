import UsuarioQuery from "../query/usuario.query.js";
import { UsuarioSecurityQuery } from "../query/usuario.query.js";

export default class UsuarioEntity {
    // objeto con campos de la tabla usuario
    usuarioEntityFields = {
        id: '',
        dui: '',
        nombre: '',
        apellido: '',
        fecha_naciento: '',
        email: '',
        pass: '',
        zona_residencia: '',
        estado_laboral_formal: '',
        condicion_medica: ''
    };

    #connPool;

    constructor(connPool) {
        this.#connPool = connPool;
        this.createAccount = this.createAccount.bind(this);
    }

    async createAccount(arrayValues) {
        const [result] = await this.#connPool.execute(UsuarioQuery.createAccount, arrayValues);
        return result;
    }


    // metodos statics sin estados

    static async deleteUserByEmail(conn, email) {
        const [result] = await conn.execute(UsuarioQuery.deleteByEmail, [email]);
        return result.affectedRows > 0;
    }
    
    static async findUserByFullName(conn, fullname) {
        console.log(values);
        const [result] = await conn.execute(UsuarioQuery.findIdByFullName, fullname);
        return result;
    }
    
    static async findUserByFullNameAndAge(conn, values) {
        console.log(values);
        const [result] = await conn.execute(UsuarioQuery.findIdByFullNameAndAge, values);
        return result;
    }

    static async findUserByEmailAndAge(conn, values) {
        console.log(values);
        
        const [result] = await conn.execute(UsuarioQuery.findIdByEmailAndAge, values);
        return result;
    }

    static async findUserByDuiAndAge(conn, values) {
        console.log("54" + values);
        const [result] = await conn.execute(UsuarioQuery.findIdByDuiAndAge, values);
        return result;
    }

    static async findUsuarioById(conn, id) {
        const [result] = await conn.execute(UsuarioQuery.findById, [id]);
        return result;
    }

    static async findIdUsuarioByEmail(conn, email) {
        const [result] = await conn.execute(UsuarioQuery.findIdByEmail, [email]);
        return result;
    }

    static async findIdUsuarioByDui(conn, dui) {
        console.log(dui);        
        const [result] = await conn.execute(UsuarioQuery.findIdByDui, [dui]);
        return result[0]?.id ?? null;
    }

    static async infoBasicaById(conn, id) {
        const [result] = await conn.execute(UsuarioQuery.usuarioInfoBasica, [id]);
        
        return result[0] ?? null;
    }

    static async infoUpdateAccountById(conn, id) {
        const [result] = await conn.execute(UsuarioQuery.usuarioInfoUpdateAccount, [id]);
        
        return result[0] ?? null;
    }

    static async accountInfoById(conn, id) {
        const [result] = await conn.execute(UsuarioQuery.usuarioAccountInfo, [id]);
        
        return result[0] ?? null;
    }

    static async updateAccountByEmail(conn, values) {
        const [result] = await conn.execute(UsuarioQuery.updateUsuarioAccountByEmail, values);
        return result.affectedRows > 0;
    }

    static async credentialsAccountVerifyByEmail(conn, email) {
        const [result] = await conn.execute(UsuarioSecurityQuery.passHashByEmail, [email]);
        
        return result[0].pass_hash ?? null;
    }

    static async updateCredentialsEmail(conn, values) {
        const [result] = await conn.execute(UsuarioSecurityQuery.updateCredentialsEmail , values);
        return result.changedRows === 0 ? false : true;
    }

    static async updateCredentialsPass(conn, values) {
        const [result] = await conn.execute(UsuarioSecurityQuery.updateCredentialsPass , values);
        console.log(result);
        
        return result.changedRows === 0 ? false : true;
    }

    static async updateCredentialsEmailPass(conn, values) {
        const [result] = await conn.execute(UsuarioSecurityQuery.updateCredentialsEmailPass , values);
        return result.changedRows > 0;
    }

    static async updateDataAccount(conn, values) {
        const [result] = await conn.execute(UsuarioSecurityQuery.updateDataAccountById , values);
        return result.changedRows > 0;
    }

    static async userDeleteAccountByEmail(conn, values) {
        const [result] = await conn.execute(UsuarioSecurityQuery.deleteAccountByEmail , values);
        return result.affectedRows > 0;
    }

    static async userDeleteCita(conn, userId) {
        const [result] = await conn.execute(UsuarioSecurityQuery.deleteCitaByUserId , [userId]);
        return result.affectedRows > 0;
    }


};