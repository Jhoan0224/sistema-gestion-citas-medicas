import EstadoCita from "./estado-cita.entity.js";
import CitaQuery from "../query/cita.query.js";

export default class CitaEntity {

    #connPool;
    constructor(connPool) {
        this.#connPool = connPool
        this.createCita = this.createCita.bind(this);
    }

    async createCita(arrayValues) {
        const [result] = await this.#connPool.execute( CitaQuery.createCita, arrayValues);
        return result;
    }

    async updateEstadoCitaByUsuarioId(arrayValues) {
        const [result] = await this.#connPool.execute(CitaQuery.updateEstadoCita, arrayValues);
        return result;
    }


    // metodos staticos
    static async citaPendienteByUsuarioId(conn, idUsuario) {
        const [result] = await conn.execute(CitaQuery.citaPendienteUsuarioById, [idUsuario]);
        return result[0] ?? null;
    }

    static async historialCitasAsistidasByUsuarioId(conn, idUsuario) {
        const [result] = await conn.execute(CitaQuery.historialCitasAsistidasByUserId, [idUsuario]);
        console.log(result);
        return result;
    }

    static async historialCitasCanceladasByUsuarioId(conn, idUsuario) {
        const [result] = await conn.execute(CitaQuery.historialCitasCanceladasByUserId, [idUsuario]);
        console.log(result);
        
        return result;
    }

    static async historialCitasPerdidasByUsuarioId(conn, idUsuario) {
        const [result] = await conn.execute(CitaQuery.historialCitasPerdidasByUserId, [idUsuario]);       
        return result;
    }
}
