import { mysqlConnPool } from "../config/databases/mysql.js";
import { EspecialidadEntity, SignosEntity, SintomasEntity } from "../database/centro_salud_db/entity/especialidad-signos-sintomas.entity.js";
import CitaEntity from "../database/centro_salud_db/entity/cita.entity.js";



export async function AppointmentScheduleEngine(dataAnalysis) {
    let conn = await mysqlConnPool.getConnection();
    try {
        const MAX_SIGNOS_SINTOMAS = 5;
        // bring list of signos and sintomas from db
        const signosList = await SignosEntity.signosList(conn);
        const sintomasList = await SintomasEntity.sintomasList(conn);

        
        const signosListUser = signosList.filter(sig => dataAnalysis?.signosIds?.includes(sig.id));
        const sintomasListUser = sintomasList.filter(sint => dataAnalysis?.sintomasIds?.includes(sint.id));
        
        const triage_promedio_signos = signosListUser.length > 0
            ? signosListUser.reduce((prevValue, item) => {return prevValue + item.nivel_triage}, 0) / signosListUser.length
            : 5;

        const triage_promedio_sintomas = sintomasListUser.length > 0
            ? sintomasListUser.reduce((prevValue, item) => prevValue + item.nivel_triage, 0) / sintomasListUser.length
            : 5;
        
        const triage_promedio_final = (triage_promedio_signos + triage_promedio_sintomas) / 2;
        const appointmentAscOrDesc = (triage_promedio_final - 2) >= 3 ? "ASC" : "DESC";
            
        // find the last appointment schedule date
        const filterAppointment = dataAnalysis.horarioPreferido == "matutino"
            ? ["07:00:00", "12:00:00"]
            : ["13:00:00", "17:00:00"];

console.log("DOKY 1");
        const lastAppointment = await CitaEntity.getLastAppointmentDate(conn, filterAppointment);
console.log("DOKY 2");

        let baseDate;

        if (!lastAppointment || !lastAppointment.fecha) {
            baseDate = new Date(); 
        } else {
            baseDate = lastAppointment.fecha instanceof Date 
                ? lastAppointment.fecha 
                : new Date(String(lastAppointment.fecha).replace(" ", "T"));
        }

        const newDateAppointmentObj = new Date(baseDate.getTime() + (30 * 60 * 1000));

        const newDateAppintment = newDateAppointmentObj.toISOString().slice(0, 19).replace("T", " ");

        return newDateAppintment;
        
    } catch (error) {
        throw error;
    } finally {
        conn?.release();
    }
};

export async function  SpecialityAppointmentEngine(dataAnalysis) {
    let conn = await mysqlConnPool.getConnection();
    try {
        const MAX_SIGNOS_SINTOMAS = 5;

        const sintomas = dataAnalysis?.sintomasIds?.filter(id => id !== 1) || [];

        const signos = dataAnalysis?.signosIds?.filter(id => id !== 1) || [];

        // Si no hay sintomas ni signos relevantes
        if (sintomas.length === 0 && signos.length === 0) {
            return 1; // Medicina General
        }

        const especialidadSignSinList = await EspecialidadEntity.especialidadSigSintList(conn);

        const resultados = {};

        especialidadSignSinList.forEach(relacion => {

            const coincideSintoma = sintomas.includes(relacion.id_sintoma);

            const coincideSigno = signos.includes(relacion.id_signo);

            if (coincideSintoma || coincideSigno) {

                if (!resultados[relacion.id_especialidad]) {
                    resultados[relacion.id_especialidad] = 0;
                }

                resultados[relacion.id_especialidad]++;
            }
        });

        // Obtener especialidad con mayor coincidencia
        let idEspecialidad = 1;
        let maxCoincidencias = 0;

        for (const id in resultados) {

            if (resultados[id] > maxCoincidencias) {
                maxCoincidencias = resultados[id];
                idEspecialidad = Number(id);
            }
        }

        return idEspecialidad;     
    } catch (error) {
        throw error;
    } finally {
        conn?.release();
    }
}