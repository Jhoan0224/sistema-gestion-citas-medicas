
export function formSearchUserSys(form) {
    const VALIDATION_RESULT = {success: false, message: ''};
    const FILTER_SEARCH = ["DUI", "EMAIL", "FULLNAME"];
    const TYPE_USER = ["PERSONAL_MEDICO", "ADMIN", "AUDITOR"];
    console.log(form);
    

    if (!TYPE_USER.some(fs => fs.includes(form.typeUser))) {
        VALIDATION_RESULT.message = 'El filtro de usuario seleccionado no es valido.';
        return VALIDATION_RESULT;
    }

    if (!FILTER_SEARCH.some(fs => fs.includes(form.typeSearch))) {
        VALIDATION_RESULT.message = 'El filtro de busqueda seleccionado no es valido.';
        return VALIDATION_RESULT;
    }

    if (form.textSearch.length === 0) {
        VALIDATION_RESULT.message = 'El campo de busqueda esta vacio.';
        return VALIDATION_RESULT;
    }

    VALIDATION_RESULT.message = 'Validacion exitosa.';
    VALIDATION_RESULT.success = true;
    return VALIDATION_RESULT;
}

function emailIsValid(email) {
    const regexEmail = /^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;

    return regexEmail.test(email);
}