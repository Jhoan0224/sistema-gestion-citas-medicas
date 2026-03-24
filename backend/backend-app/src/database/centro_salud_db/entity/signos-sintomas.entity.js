import { SignosQuery, SintomasQuery } from "../query/signos-sintomas.query.js";

export class SignosEntity {

    
    static async signosList(conn) {
        const [result] = await conn.execute(SignosQuery.signosList);
        return result;
    }

};

export class SintomasEntity {
    
    static async sintomasList(conn) {
        const [result] = await conn.execute(SintomasQuery.sintomasList);
        return result;
    }

};