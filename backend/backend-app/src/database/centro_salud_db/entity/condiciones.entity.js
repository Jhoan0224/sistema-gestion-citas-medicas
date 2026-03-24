import CondicionQuery from '../query/condicion.query.js'


export default class CondicionEntity {

    static async condicionesList(conn) {
        const [result] = await conn.execute(CondicionQuery.condicionesList);
        return result;
    }
};