
export class SignosQuery {

    static signosList = `
        SELECT sig.id, sig.nombre, sig.nivel_triage FROM signos sig
    `;

};

export class SintomasQuery {
    
    static sintomasList = `
        SELECT sint.id, sint.nombre, sint.nivel_triage FROM sintomas sint
    `;

};