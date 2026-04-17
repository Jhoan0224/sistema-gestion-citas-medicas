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
}
