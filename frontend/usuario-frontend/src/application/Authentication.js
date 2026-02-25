import { validarAuth } from "../api/auth";


export function getAuthToken() {
    const myToken = localStorage.getItem('my_token');

    if (!myToken) return true;

    validarAuth().then(result => { return result});
};

export function verificarAuth() {
    const myToken = localStorage.getItem('my_token');

    if (!myToken) return true;

    validarAuth().then(result => { return result});
};