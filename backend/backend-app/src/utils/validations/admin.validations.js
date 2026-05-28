
export function formSearchNormalUser(form) {
    const VALIDATION_RESULT = {success: false, message: ''};
    const FILTER_SEARCH = ["DUI", "EMAIL", "FULLNAME"];
    
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

export function formCreateUserSysAccount(form) {
    const VALIDATION_RESULT = {success: false, message: 'Formulario es valido.'};
    
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
    if (!textZonaResidenciaIsValid(form.zona_residencia)) {
        VALIDATION_RESULT.message = 'La Zona de Residencia solo puede contener: letras, numeros y guiones.';
        return VALIDATION_RESULT; 
    }
    
    if (!idIsValid(form.id_rol)) {
        VALIDATION_RESULT.message = 'La ocupacion seleccionada no es valida.';
        return VALIDATION_RESULT;      
    }

    if ( !form?.ids_privilegios || !form.ids_privilegios.every(id => idIsValid(id) || form.ids_privilegios.length === 0)) {
        VALIDATION_RESULT.message = 'Los privilegios seleccionados no son validos.';
        return VALIDATION_RESULT; 
    }

    VALIDATION_RESULT.success = true;
    return VALIDATION_RESULT;
};




function emailIsValid(email) {
    const regexEmail = /^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;

    return regexEmail.test(email);
}

function inputIsBoolean(input) {
    return typeof input === 'boolean';
}

function textDescripcionIsValid(textInput) {
    const regexTextDescripcion = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s._,-]+$/;
    
    return regexTextDescripcion.test(textInput.trim());
}

function textZonaResidenciaIsValid(textInput) {
    const regexTextZonaResidencia = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9_,.#\-\s]+$/;

    return regexTextZonaResidencia.test(textInput.trim());
}

function idIsValid(textId) {
    const regexIsInteger = /^\d+$/;

    return regexIsInteger.test(textId.toString().trim());
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