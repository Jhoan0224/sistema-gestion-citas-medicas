

export function formLoginAdmin(form) {
    const VALIDATION_RESULT = {success: false, message: ''};
    const TYPE_LOGIN = "ADMIN";
    console.log(form);
    
    if (form.typeLogin !== TYPE_LOGIN) {
        VALIDATION_RESULT.message = 'EL inicio de sesion seleccionado es incorrecto.';
        return VALIDATION_RESULT;
    }

    if (!emailIsValid(form.email)) {
        VALIDATION_RESULT.message = 'EL Email que has ingresado no tiene el formato correcto.';
        return VALIDATION_RESULT;
    }

    if (form.pass.length === 0) {
        VALIDATION_RESULT.message = 'El campo de contrasena esta vacio.';
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