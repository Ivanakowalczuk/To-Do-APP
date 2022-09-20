/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {
}

function normalizarTexto(texto) {
texto = texto.trim();

}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
}

function normalizarEmail(email) {
    email = email.trim();
    email = email.toLowerCase();
    return email;
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
    if (contrasenia.length < 8) {
        return false
    }
    return true
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
    if (contrasenia_1 !== contrasenia_2) {
        return false
    }
}

