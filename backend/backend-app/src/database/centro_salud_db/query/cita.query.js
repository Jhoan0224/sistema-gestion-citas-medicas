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
        ct.id, ct.nombre, ct.motivo, ct.fecha_atencion, ct.id_estado_cita, ct.id_usuario
    FROM 
        cita ct
    WHERE
        cita.id_estado = ${EstadoCita.ESTADO.PENDIENTE} AND cita.id_usuario = ?
    `;
    
}


//   id int auto_increment primary key,
//   nombre varchar(50),
//   motivo varchar(300),
//   fecha_atencion datetime,
//   fecha_hora_registro timestamp default CURRENT_TIMESTAMP(),
//   id_estado_cita int,
//  id_usuario int,
