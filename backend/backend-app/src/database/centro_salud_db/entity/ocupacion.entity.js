import OcupacionQuery from '../query/ocupacion.query.js'

export default class OcupacionEntity {


    static async ocupacionesList(conn) {
        const [result] = await conn.execute(OcupacionQuery.ocupacionesList);
        return result;
    }

};