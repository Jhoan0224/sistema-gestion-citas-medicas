
export function formAgendarCitaUsuario(form) {
    const VALIDATION_RESULT = {success: false, message: ''};
    
    // validar todos los campos completos
    if (hayCamposVacios(form)) {
        VALIDATION_RESULT.message = 'Asegurate que completar todos las entradas.';
        return VALIDATION_RESULT;
    }

    if (!textDescripcionIsValid(form.titulo)) {
        VALIDATION_RESULT.message = 'Debes agregar un titulo valido.';
        return VALIDATION_RESULT;
    }

    if (!textDescripcionIsValid(form.motivo)) {
        VALIDATION_RESULT.message = 'Debes agregar un descripción valida.';
        return VALIDATION_RESULT;
    }
        
    if (!idIsValid(form.tipoAtencion)) {
        VALIDATION_RESULT.message = 'Ha ocurrido un error en el formulario (Tipo de atencion).';
        return VALIDATION_RESULT; 
    }

    if (!idIsValid(form.horarioPreferido)) {
        VALIDATION_RESULT.message = 'Ha ocurrido un error en el formulario (Horario preferido).';
        return VALIDATION_RESULT; 
    }

    if (!form.signosIds.every(id => idIsValid(id))) {
        VALIDATION_RESULT.message = 'Ha ocurrido un error en el formulario (Signos Ids).';
        return VALIDATION_RESULT; 
    }

    if (!form.sintomasIds.every(id => idIsValid(id))) {
        VALIDATION_RESULT.message = 'Ha ocurrido un error en el formulario (Sintomas Ids).';
        return VALIDATION_RESULT; 
    }

    VALIDATION_RESULT.success = true;
    VALIDATION_RESULT.message = "EL Formulario es valido.";
    return VALIDATION_RESULT;
};



export function formUpdateSecurityAccount(form) {
    const VALIDATION_RESULT = {success: false, message: ''};
    
    if (!emailIsValid(form.email)) {
        VALIDATION_RESULT.message = 'El formato del Email no es valido.';
        return VALIDATION_RESULT;
    }
    
    if (form.isEmailModified && !emailIsValid(form.newEmail)) {
        VALIDATION_RESULT.message = 'El formato del Nuevo Email no es valido.';
        return VALIDATION_RESULT;
    }

    if (!passLengthIsValid(form.newPassCheck1) || !passLengthIsValid(form.newPassCheck2)) {
        VALIDATION_RESULT.message = 'La Contraseña debe tener entre 12 y 20 caracteres, sin espacios en los extremos.';
        return VALIDATION_RESULT;   
    }

    if (!passAreEquals(form.newPassCheck1, form.newPassCheck2)) {
        VALIDATION_RESULT.message = 'Las Nuevas Contraseñas deben coincidir.';
        return VALIDATION_RESULT;   
    }
    
    VALIDATION_RESULT.success = true;
    VALIDATION_RESULT.message = "EL Formulario es valido.";
    return VALIDATION_RESULT;
}

export function formUpdateInfoCuenta(form) {
    const VALIDATION_RESULT = {success: false, message: ''};
    
    // validar todos los campos completos
    if (hayCamposVacios(form)) {
        VALIDATION_RESULT.message = 'Asegurate que completar todos las entradas.';
        return VALIDATION_RESULT;
    }

    if (hayNombresNoValidos(form.nombre)) {
        VALIDATION_RESULT.message = 'El nombre solo puede incluir Letras.';
        return VALIDATION_RESULT;
    }

    if (hayNombresNoValidos(form.apellido)) {
        VALIDATION_RESULT.message = 'El nombre solo puede incluir Letras.';
        return VALIDATION_RESULT;
    }
    
    if (!duiIsValid(form.dui)) {
        VALIDATION_RESULT.message = 'El DUI debe tener el formato 00000000-0.';
        return VALIDATION_RESULT; 
    }
    
    if (!esMayorDeEdad(form.fecha_nacimiento)) {
        VALIDATION_RESULT.message = 'La Edad minima debe ser 18 años.';
        return VALIDATION_RESULT; 
    }
        
    if (!textZonaResidenciaIsValid(form.zona_residencia)) {
        VALIDATION_RESULT.message = 'La Zona de Residencia solo puede contener: letras, numeros y guiones.';
        // VALIDATION_RESULT.message = 'El departamento seleccionado no es valido.';
        return VALIDATION_RESULT; 
    }
    
    if (!idIsValid(form.idOcupacion)) {
        // VALIDATION_RESULT.message = 'El estado laboral debe ser booleano.';
        VALIDATION_RESULT.message = 'La ocupacion seleccionada no es valida.';
        return VALIDATION_RESULT;      
    }
    
    if (!idIsValid(form.idCondicion)) {
        // VALIDATION_RESULT.message = 'El campo condicion medica debe ser booleano';
        VALIDATION_RESULT.message = 'La condicion seleccionada no es valida.';
        return VALIDATION_RESULT; 
    }

    VALIDATION_RESULT.success = true;
    VALIDATION_RESULT.message = "EL Formulario es valido.";
    return VALIDATION_RESULT;
};

export function formDeleteUserAccount(form) {
    const VALIDATION_RESULT = {success: false, message: ''};

    if (!emailIsValid(form.email)) {
        VALIDATION_RESULT.message = 'No es Valido el formulario de eliminación de la Cuenta, intentalo de nuevo o comunicate con soporte/';
        return VALIDATION_RESULT;
    }

    VALIDATION_RESULT.success = true;
    VALIDATION_RESULT.message = "EL Formulario es valido.";
    return VALIDATION_RESULT;
};

export function formCrearCuenta(form) {
    const VALIDATION_RESULT = {success: false, message: ''};
    
    // validar todos los campos completos
    if (hayCamposVacios(form)) {
        VALIDATION_RESULT.message = 'Asegurate que completar todos las entradas.';
        return VALIDATION_RESULT;
    }

    if (hayNombresNoValidos(form.nombre)) {
        VALIDATION_RESULT.message = 'El nombre solo puede incluir Letras.';
        return VALIDATION_RESULT;
    }

    if (hayNombresNoValidos(form.apellido)) {
        VALIDATION_RESULT.message = 'El nombre solo puede incluir Letras.';
        return VALIDATION_RESULT;
    }
    
    if (!duiIsValid(form.dui)) {
        VALIDATION_RESULT.message = 'El DUI debe tener el formato 00000000-0.';
        return VALIDATION_RESULT; 
    }
    
    if (!esMayorDeEdad(form.fechaNacimiento)) {
        VALIDATION_RESULT.message = 'La Edad minima debe ser 18 años.';
        return VALIDATION_RESULT; 
    }
        
    if (!emailIsValid(form.email)) {
        VALIDATION_RESULT.message = 'El formato del Email no es valido.';
        return VALIDATION_RESULT;  
    }

    if (!passAreEquals(form.pass1, form.pass2)) {
        VALIDATION_RESULT.message = 'Las contraseñas deben coincidir.';
        return VALIDATION_RESULT;  
    }

    if (!passLengthIsValid(form.pass1) || !passLengthIsValid(form.pass2)) {
        VALIDATION_RESULT.message = 'La Contraseña debe tener entre 12 y 20 caracteres, sin espacios en los extremos.';
        return VALIDATION_RESULT;        
    }
    if (!textZonaResidenciaIsValid(form.zonaResidencia)) {
        VALIDATION_RESULT.message = 'La Zona de Residencia solo puede contener: letras, numeros y guiones.';
        // VALIDATION_RESULT.message = 'El departamento seleccionado no es valido.';
        return VALIDATION_RESULT; 
    }
    
    if (!idIsValid(form.ocupacionId)) {
        // VALIDATION_RESULT.message = 'El estado laboral debe ser booleano.';
        VALIDATION_RESULT.message = 'La ocupacion seleccionada no es valida.';
        return VALIDATION_RESULT;      
    }
    
    if (!idIsValid(form.condicionId)) {
        // VALIDATION_RESULT.message = 'El campo condicion medica debe ser booleano';
        VALIDATION_RESULT.message = 'La condicion seleccionada no es valida.';
        return VALIDATION_RESULT; 
    }

    VALIDATION_RESULT.success = true;
    VALIDATION_RESULT.message = "EL Formulario es valido.";
    return VALIDATION_RESULT;
};


function inputIsBoolean(input) {
    return typeof input === 'boolean';
}

function textDescripcionIsValid(textInput) {
    const regexTextDescripcion = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s._,-]+$/;
    
    return regexTextDescripcion.test(textInput.trim());
}

function textZonaResidenciaIsValid(textInput) {
    const regexTextZonaResidencia = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/;

    return regexTextZonaResidencia.test(textInput.trim());
}

function idIsValid(textId) {
    const regexIsInteger = /^\d+$/;

    return regexIsInteger.test(textId.toString().trim());
}

function emailIsValid(email) {
    const regexEmail = /^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
    return regexEmail.test(email);
}

function passLengthIsValid(pass) {
    const PASS_LENGTH_MIN = 12;
    const PASS_LENGTH_MAX = 20;
    const passLength = pass.trim().length;
    return   PASS_LENGTH_MIN >= passLength && passLength <= PASS_LENGTH_MAX;
}

function passAreEquals(pass1, pass2) {

    return pass1.trim() === pass2.trim();
}

function esMayorDeEdad(fechaNacimientoUser) {
    const EDAD_MINIMA = 18;   
    const [year, month, day] = fechaNacimientoUser.split("T")[0].split("-").map(Number);
    
    const fechaActual = new Date();
    const fechaNacimiento = new Date(year, month, day);
    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    const mes = fechaActual.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate()) ) {
        edad --;
    }

    return edad >= EDAD_MINIMA;    
}

function duiIsValid(dui) {
    const regexDui = /^[0-9]{8}-\d/;

    return regexDui.test(dui.trim());
}

function hayCamposVacios(form) {
    const regexEmpyString = /^\s*$/;

    // convert Object values to Array
    const formValues = Object.values(form);
    return formValues.some(value => regexEmpyString.test(value));
}

function hayNombresNoValidos(nombres) {
    const regexValidName = /^[a-zA-Z]/;
    
    const arrayNombres = nombres.trim().split(/\s+/);
    return arrayNombres.some(nombre => !regexValidName.test(nombre));
}