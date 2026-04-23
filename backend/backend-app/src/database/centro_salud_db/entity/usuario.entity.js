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
        const [result] = await await this.#connPool.execute(UsuarioQuery.createAccount, arrayValues);
        return result;
    }


    // metodos statics sin estados
    static async findUsuarioById(conn, id) {
        const [result] = await conn.execute(UsuarioQuery.findById, [id]);
        return result;
    }

    static async findIdUsuarioByEmail(conn, email) {
        const [result] = await conn.execute(UsuarioQuery.findIdByEmail, [email]);
        return result;
    }

    static async findIdUsuarioByDui(conn, dui) {
        const [result] = await conn.execute(UsuarioQuery.findIdByDui, [dui]);
        return result;
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
};


