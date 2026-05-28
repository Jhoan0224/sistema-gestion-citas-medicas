import { mysqlConnPool } from "../../config/databases/mysql.js"
import { SignosEntity, SintomasEntity } from "../../database/centro_salud_db/entity/especialidad-signos-sintomas.entity.js";
import DepartamentoEntity from '../../database/centro_salud_db/entity/departamento.entity.js'
import CondicionEntity from '../../database/centro_salud_db/entity/condiciones.entity.js'
import OcupacionEntity from '../../database/centro_salud_db/entity/ocupacion.entity.js'


export async function signosListSvc() {
    const PROCESS_RESULT = {success: false, signos: []};
    let conn = await mysqlConnPool.getConnection();
    try {
        const signosList = await SignosEntity.signosList(conn);
        if (signosList.length === 0) {
            return PROCESS_RESULT;
        }
        
        PROCESS_RESULT.success = true;
        PROCESS_RESULT.signos = signosList;
        return PROCESS_RESULT;
        
    } catch (error) {
        throw error;
    } finally {conn?.release();}
};

export async function sintomasListSvc() {
    const PROCESS_RESULT = {success: false, sintomas: []};
    let conn = await mysqlConnPool.getConnection();
    try {
        const sintomasList = await SintomasEntity.sintomasList(conn);

        if (sintomasList.length  === 0) {
            return PROCESS_RESULT;
        }
        console.log("of")
        PROCESS_RESULT.success = true;
        PROCESS_RESULT.sintomas = sintomasList;
        return PROCESS_RESULT;
        
    } catch (error) {
        throw error;
    } finally {conn?.release();}
};

export async function departamentosListSvc() {
    const PROCESS_RESULT = {success: false, departamentos: []};
    let conn = await mysqlConnPool.getConnection();
    try {
        const departamentosList = await DepartamentoEntity.deparmentosList(conn);

        if (departamentosList.length    === 0) return PROCESS_RESULT;

        PROCESS_RESULT.success = true;
        PROCESS_RESULT.departamentos = departamentosList;
        return PROCESS_RESULT;
        
    } catch (error) { throw error; } finally { conn?.release(); }
};

export async function condicionesListSvc() {
    const PROCESS_RESULT = {success: false, condiciones: []};
    let conn = await mysqlConnPool.getConnection();
    try {
        const condicionesList = await CondicionEntity.condicionesList(conn);

        if (condicionesList.length  === 0) return PROCESS_RESULT;

        PROCESS_RESULT.success = true;
        PROCESS_RESULT.condiciones = condicionesList;
        return PROCESS_RESULT;
        
    } catch (error) { throw error; } finally { conn?.release(); }
};

export async function ocupacionesListSvc() {
    const PROCESS_RESULT = {success: false, ocupaciones: []};
    let conn = await mysqlConnPool.getConnection();
    try {
        const ocupacionesList = await OcupacionEntity.ocupacionesList(conn);

        if (ocupacionesList.length  === 0) return PROCESS_RESULT;

        PROCESS_RESULT.success = true;
        PROCESS_RESULT.ocupaciones = ocupacionesList;
        return PROCESS_RESULT;
        
    } catch (error) { throw error; } finally { conn?.release(); }
};