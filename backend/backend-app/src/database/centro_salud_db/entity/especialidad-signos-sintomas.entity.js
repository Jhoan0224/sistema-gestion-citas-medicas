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

export class EspecialidadEntity {
    

    static especialidadList = `
    SELECT esp.id, esp.nombre, ess.id_signo, ess.id_sintoma
    FROM
        especialidad esp
    JOIN
        especialidad_signos_sintomas ess ON ess.id_especialidad = esp.id
    ORDER BY
        esp.id ASC
    `;
    
    static async especialidadSigSintList(conn) {
        const [result] = await conn.execute(EspecialidadEntity.especialidadList);
        return result;
    }

};