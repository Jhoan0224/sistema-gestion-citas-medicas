
export function formLoginUsuario(form) {
    const VALIDATION_RESULT = {success: false, message: ''};

    if (hayCamposVacios(form)) {
        VALIDATION_RESULT.message = 'Asegurate que completar todos las entradas.';
        return VALIDATION_RESULT;
    }

    if (!emailIsValid(form.email)) {
        VALIDATION_RESULT.message = 'El formato del Email no es valido.';
        return VALIDATION_RESULT;  
    }

    VALIDATION_RESULT.success = true;
    VALIDATION_RESULT.message = "EL Formulario es valido.";
    return VALIDATION_RESULT;
}


function hayCamposVacios(form) {
    const regexEmpyString = /^\s*$/;

    // convert Object values to Array
    const formValues = Object.values(form);
    return formValues.some(value => regexEmpyString.test(value));
}

function emailIsValid(email) {
    const regexEmail = /^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;

    return regexEmail.test(email);
}