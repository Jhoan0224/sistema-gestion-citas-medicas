import EstadoCita from "../entity/estado-cita.entity.js";

export default class CitaQuery {

    static createCita = `
    INSERT INTO
        cita(nombre, motivo, fecha_atencion, id_estado_cita, id_usuario)
    VALUES
        (?, ?, ?, ?, ?, )
    `;

    static updateEstadoCita = `
    UPDATE cita
        SET id_estado_cita = ?
    WHERE
        cita.id = ?
    `;

    static citaPendienteUsuarioById = `
    SELECT
        ct.id, ct.titulo, ct.motivo, ct.fecha_hora_atencion, std_ct.nombre as estado_cita, esp.nombre as especialidad
    FROM 
        cita ct
    JOIN
        especialidad esp on  esp.id = ct.id_espcialidad
    JOIN
        estado_cita std_ct on std_ct.id = ct.id_estado_cita
    WHERE
        ct.id_estado_cita = ${EstadoCita.ESTADO.AGENDADA} OR ${EstadoCita.ESTADO.CONFIRMADA}
        AND ct.id_usuario = ?
    `;

    static historialCitasAsistidasByUserId = `
    SELECT
        ct.id, ct.titulo, ct.fecha_hora_atencion, esp.nombre as especialidad
    FROM 
        cita ct
    JOIN
        especialidad esp on  esp.id = ct.id_espcialidad
    JOIN
        estado_cita std_ct on std_ct.id = ct.id_estado_cita
    WHERE
        ct.id_estado_cita = ${EstadoCita.ESTADO.ASISTIDA} AND ct.id_usuario = ?
    `;

    static historialCitasCanceladasByUserId = `
    SELECT
        ct.id, ct.titulo, ct.fecha_hora_atencion, esp.nombre as especialidad
    FROM 
        cita ct
    JOIN
        especialidad esp on  esp.id = ct.id_espcialidad
    JOIN
        estado_cita std_ct on std_ct.id = ct.id_estado_cita
    WHERE
        ct.id_estado_cita = ${EstadoCita.ESTADO.CANCELADA} AND ct.id_usuario = ?
    `;

    static historialCitasPerdidasByUserId = `
    SELECT
        ct.id, ct.titulo, ct.fecha_hora_atencion, esp.nombre as especialidad
    FROM
        cita ct
    JOIN
        especialidad esp on  esp.id = ct.id_espcialidad
    JOIN
        estado_cita std_ct on std_ct.id = ct.id_estado_cita
    WHERE
        ct.id_estado_cita = ${EstadoCita.ESTADO.INASISTIDA} AND ct.id_usuario = ?
    `;
    
}