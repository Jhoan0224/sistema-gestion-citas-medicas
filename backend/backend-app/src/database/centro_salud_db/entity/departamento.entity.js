import DepartamentoQuery from '../query/departamento.query.js'

export default class DepartamentoEntity {

    static async deparmentosList(conn) {
        const [result] = await conn.execute(DepartamentoQuery.departamentosList);
        return result;
    }
};