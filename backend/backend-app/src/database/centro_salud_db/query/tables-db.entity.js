

export class TableDbEntity {

    static async getInfoTableRoles(conn) {
        const [rows, fields] = await conn.execute("SELECT * FROM rol");
        return [rows, fields];
    };

    static async getInfoTablePrivilegios(conn) {
        const [rows, fields] = await conn.execute("SELECT * FROM privilegio");
        return [rows, fields];
    };

    static async getInfoTableSignos(conn) {
        const [rows, fields] = await conn.execute("SELECT * FROM signos");
        return [rows, fields];
    };

    static async getInfoTableEstadoCita(conn) {
        const [rows, fields] = await conn.execute("SELECT * FROM estado_cita");
        return [rows, fields];
    };

    static async getInfoTableSintomas(conn) {
        const [rows, fields] = await conn.execute("SELECT * FROM sintomas");
        return [rows, fields];
    };

    static async getInfoTableEspecialidad(conn) {
        const [rows, fields] = await conn.execute("SELECT * FROM especialidad");
        return [rows, fields];
    };

    static async getInfoTableCondiciones(conn) {
        const [rows, fields] = await conn.execute("SELECT * FROM condiciones");
        return [rows, fields];
    };

    static async getInfoTableOcupaciones(conn) {
        const [rows, fields] = await conn.execute("SELECT * FROM ocupaciones");
        return [rows, fields];
    };

}