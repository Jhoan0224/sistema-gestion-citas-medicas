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
    static async getAgendaCitasHoy(conn, currentDate, tomorrowDate) {
        const [result] = await conn.execute(CitaQuery.agendaCitasHoy, [currentDate, tomorrowDate]);
        return result;
    }

    static async citaPendienteByUsuarioId(conn, idUsuario) {
        const [result] = await conn.execute(CitaQuery.citaPendienteUsuarioById, [idUsuario]);
        return result[0] ?? null;
    }

    static async historialCitasAsistidasByUsuarioId(conn, idUsuario) {
        const [result] = await conn.execute(CitaQuery.historialCitasAsistidasByUserId, [idUsuario]);

        return result;
    }

    static async historialCitasCanceladasByUsuarioId(conn, idUsuario) {
        const [result] = await conn.execute(CitaQuery.historialCitasCanceladasByUserId, [idUsuario]);
       
        return result;
    }

    static async historialCitasPerdidasByUsuarioId(conn, idUsuario) {
        const [result] = await conn.execute(CitaQuery.historialCitasPerdidasByUserId, [idUsuario]);       
        return result;
    }
    /* Agenda de Cita Medica Transaccion */
    static async agendarCitaUsuarioById(conn, values) {
        const [result] = await conn.execute(CitaQuery.agendarCitaByUserId, values);       
        return result;
    }

    static async citaSintomasByCitaId(conn, valuesMatriz) {
        const [result] = await conn.execute(CitaQuery.historialCitasPerdidasByUserId, valuesMatriz);       
        return result;
    }

    static async citaSignosByCitaId(conn, valuesMatriz) {
        const [result] = await conn.execute(CitaQuery.historialCitasPerdidasByUserId, valuesMatriz);       
        return result;
    }
}
