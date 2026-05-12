

export function formSearchUser(form) {
    const VALIDATION_RESULT = {success: false, message: ''};
    const AGE_FILTER = {default: "ALL_AGE", min: 1, max: 99};
    const FILTER_SEARCH = ["DUI", "EMAIL", "FULLNAME"];

    if (!FILTER_SEARCH.some(fs => fs.includes(form.filterSearch))) {
        VALIDATION_RESULT.message = 'El filtro de busqueda seleccionado no es valido.';
        return VALIDATION_RESULT;
    }

    if (form.textSearch.length === 0) {
        VALIDATION_RESULT.message = 'El campo de busqueda esta vacio.';
        return VALIDATION_RESULT;
    }

    if (form.aproxAge !== AGE_FILTER.default) {
        if (form.aproxAge < AGE_FILTER.min || form.aproxAge > AGE_FILTER.max) {
            VALIDATION_RESULT.message = 'El filtro de Edad no es valido.';
            return VALIDATION_RESULT;
        }
    }

    VALIDATION_RESULT.message = 'Validacion exitosa.';
    VALIDATION_RESULT.success = true;
    return VALIDATION_RESULT;
}

function emailIsValid(email) {
    const regexEmail = /^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;

    return regexEmail.test(email);
}