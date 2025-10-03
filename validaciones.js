/* ===== FUNCIONES DE VALIDACIÓN GENERALES ===== */

/**
 * Muestra un mensaje de error para un campo específico.
 * @param {HTMLElement} field - El campo de entrada que tiene el error.
 * @param {string} message - El mensaje de error a mostrar.
 */
function showError(field, message) {
    field.classList.add('invalid');
    const errorElement = document.getElementById(field.id + '-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

/**
 * Limpia el mensaje de error de un campo específico.
 * @param {HTMLElement} field - El campo de entrada a limpiar.
 */
function clearError(field) {
    field.classList.remove('invalid');
    const errorElement = document.getElementById(field.id + '-error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

/* ===== VALIDACIONES ESPECÍFICAS ===== */

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function isValidName(name) {
    // Permite letras, espacios y tildes.
    const re = /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]{3,}$/;
    return re.test(name);
}

function isValidPhone(phone) {
    // Formato simple para Chile (9xxxxxxxx)
    const re = /^9[0-9]{8}$/;
    return re.test(phone);
}

function validateRun(run) {
    // Limpia el RUN de puntos y guión
    run = run.replace(/\./g, '').replace(/-/g, '').trim().toLowerCase();
    const runBody = run.slice(0, -1);
    let dv = run.slice(-1);

    if (!/^[0-9]+[0-9kK]$/.test(run)) return false;

    let sum = 0;
    let multiple = 2;

    for (let i = runBody.length - 1; i >= 0; i--) {
        sum += runBody.charAt(i) * multiple;
        if (multiple < 7) multiple++;
        else multiple = 2;
    }

    let dvExpected = 11 - (sum % 11);
    
    if (dvExpected === 11) {
        dvExpected = '0';
    } else if (dvExpected === 10) {
        dvExpected = 'k';
    } else {
        dvExpected = String(dvExpected);
    }

    return dv === dvExpected;
}

/* ===== VALIDACIÓN DEL FORMULARIO DE REGISTRO ===== */
function initRegisterFormValidation() {
    const registerForm = document.querySelector('.login-form'); // Asumiendo que es el único en la página
    if (!registerForm || !document.getElementById('confirm-password')) return; // Solo se ejecuta en register.html

    const fields = ['nombre', 'email', 'password', 'confirm-password', 'telefono', 'rut'];
    const formFields = {};
    fields.forEach(id => formFields[id] = document.getElementById(id));

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isFormValid = true;

        // Limpiar errores previos
        fields.forEach(id => clearError(formFields[id]));

        // Validaciones
        if (!isValidName(formFields.nombre.value)) {
            showError(formFields.nombre, 'Por favor, ingrese un nombre válido (mínimo 3 letras).');
            isFormValid = false;
        }
        if (!isValidEmail(formFields.email.value)) {
            showError(formFields.email, 'Por favor, ingrese un correo electrónico válido.');
            isFormValid = false;
        }
        const password = formFields.password.value;
        if (password.length < 8) {
            showError(formFields.password, 'La contraseña debe tener al menos 8 caracteres.');
            isFormValid = false;
        } else if (!/[A-Z]/.test(password)) {
            showError(formFields.password, 'La contraseña debe contener al menos una mayúscula.');
            isFormValid = false;
        } else if (!/[0-9]/.test(password)) {
            showError(formFields.password, 'La contraseña debe contener al menos un número.');
            isFormValid = false;
        }
        if (formFields.password.value !== formFields['confirm-password'].value) {
            showError(formFields['confirm-password'], 'Las contraseñas no coinciden.');
            isFormValid = false;
        }
        if (!isValidPhone(formFields.telefono.value)) {
            showError(formFields.telefono, 'Ingrese un teléfono válido (Ej: 912345678).');
            isFormValid = false;
        }
        if (!validateRun(formFields.rut.value)) {
            showError(formFields.rut, 'Ingrese un RUT válido (sin puntos y con guión).');
            isFormValid = false;
        }

        if (isFormValid) {
            alert('¡Registro exitoso!');
            // Aquí se puede enviar el formulario o redirigir al usuario
            // registerForm.submit(); 
            window.location.href = 'login.html';
        }
    });
}

/* ===== VALIDACIÓN DEL FORMULARIO DE LOGIN ===== */
function initLoginFormValidation() {
    const loginForm = document.querySelector('.login-form');
    if (!loginForm || document.getElementById('confirm-password')) return; // Solo se ejecuta en login.html

    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isFormValid = true;

        clearError(emailField);
        clearError(passwordField);

        if (!isValidEmail(emailField.value)) {
            showError(emailField, 'Por favor, ingrese un correo electrónico válido.');
            isFormValid = false;
        }

        if (passwordField.value.trim() === '') {
            showError(passwordField, 'Por favor, ingrese su contraseña.');
            isFormValid = false;
        }

        if (isFormValid) {
            alert('¡Inicio de sesión exitoso!');
            // lógica de autenticación y redirección
            window.location.href = 'index.html';
        }
    });
}


/* ===== INICIALIZACIÓN DE TODAS LAS VALIDACIONES ===== */
document.addEventListener('DOMContentLoaded', function() {
    initRegisterFormValidation();
    initLoginFormValidation();
});