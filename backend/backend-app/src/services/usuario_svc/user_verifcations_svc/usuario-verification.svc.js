import UsuarioEntity from "../../../database/centro_salud_db/entity/usuario.entity.js";


export default class UsuarioVerficication {

    static async emailIsAvailable(conn, emailCheck) {
        const result = await UsuarioEntity.findIdUsuarioByEmail(conn, emailCheck);
        console.log(result);
        console.log(result.length === 0);
        return result.length === 0;
    }

    static async duiIsAvailable(conn, duiCheck) {
        const result = await UsuarioEntity.findIdUsuarioByDui(conn, duiCheck);
        return result.length === 0;
    }


}
