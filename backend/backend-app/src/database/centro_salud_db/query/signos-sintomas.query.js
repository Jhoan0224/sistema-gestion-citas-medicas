
export class SignosQuery {

    static signosList = `
        SELECT sig.id, sig.nombre FROM signos sig
    `;

};

export class SintomasQuery {
    
    static sintomasList = `
        SELECT sint.id, sint.nombre FROM sintomas sint
    `;

};