import EstadoCita from "../entity/estado-cita.entity.js";

export default class CitaQuery {

    static createCita = `
    INSERT INTO
        cita(nombre, motivo, fecha_hora_atencion, id_estado_cita, id_usuario)
    VALUES
        (?, ?, ?, ?, ?, )
    `;

    static updateEstadoCita = `
    UPDATE cita
        SET id_estado_cita = ?
    WHERE
        cita.id = ?
    `;

    static lastAppointmentDate = `
    SELECT ct.id, ct.fecha_hora_atencion 
    FROM cita ct
    WHERE
        TIME(ct.fecha_hora_atencion) >= ? AND TIME(ct.fecha_hora_atencion) <= ?
    ORDER BY ct.fecha_hora_atencion DESC
    LIMIT 1
    `;

    static agendaCitasHoy = `
    SELECT
        ct.id, ct.titulo, ct.motivo, ct.fecha_hora_atencion, std_ct.nombre as estado_cita,
        esp.nombre as especialidad, user.dui as dui_usuario, user.id as id_usuario, CONCAT(user.nombre, ' ', user.apellido) as usuario 
    FROM 
        cita ct
    JOIN
        especialidad esp ON  esp.id = ct.id_espcialidad
    JOIN
        estado_cita std_ct ON std_ct.id = ct.id_estado_cita
    JOIN
        usuario user ON user.id = ct.id_usuario
    WHERE
        ct.id_estado_cita = ${EstadoCita.ESTADO.AGENDADA} OR ${EstadoCita.ESTADO.CONFIRMADA}
        AND ct.fecha_hora_atencion >= ? AND ct.fecha_hora_atencion < ?
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
        ( ct.id_estado_cita = ${EstadoCita.ESTADO.AGENDADA}
          OR ct.id_estado_cita = ${EstadoCita.ESTADO.CONFIRMADA}
        )
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


    /* Agendar Cita Medica SQL Transaccion */
    static agendarCitaByUserId = `
    INSERT INTO
        cita(titulo, motivo, fecha_hora_atencion, id_espcialidad, id_estado_cita, id_usuario)
    VALUES
        (?, ?, ?, ?, ?, ?)
    `;

    // ejec
    static citaSignosByCitaID = `
    INSERT INTO
        cita_signos(id_cita, id_signo)
    VALUES
        ?
    `;

    static citaSintomasByCitaID = `
    INSERT INTO
        cita_sintomas(id_cita, id_sintoma)
    VALUES
        ?
    `;
    

}