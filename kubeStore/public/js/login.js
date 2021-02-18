import { showMessage } from './utils/errors.js'

window.onload = (function () {

    $('#loginForm')[0].reset()

    const email = $('#email')
    const password = $('#password')
    const loginButton = $('#submit')

    var errorIcon = `<i class="fas fa-exclamation-circle"></i>`;

    var formArray = [email, password]

    email.on('blur', {}, (e) => {
        let value = e.target.value
        let valueTrimmed = value.trim()

        $('.error-email').remove()

        if (valueTrimmed == '') {
            email.removeClass('valid')
            email.after(`<div class='error error-email'>Insert your email.${errorIcon}</div>`).empty()
        } else if (!/[a-zA-Z0-9]+@[a-zA-z]+\.[a-zA-Z]+/.test(valueTrimmed)) {
            email.removeClass('valid')
            email.after(`<div class='error error-email'>Insert a valid email.${errorIcon}</div>`).empty()
        } else {
            email.addClass('valid')
            $('.error-email').remove()
        }

    })

    password.on('blur', {}, (e) => {
        let value = e.target.value
        let valueTrimmed = value.trim()

        $('.error-password').remove()

        if (valueTrimmed == '') {
            password.removeClass('valid')
            password.after(`<div class='error error-password'>Insert your password. ${errorIcon}</div>`).empty()
        } else {
            password.addClass('valid')
            $('.error-password').remove()
        }

    })

    loginButton.on('click', {}, (e) => {
        // Evito que recargue la página
        e.preventDefault()
        // Verifico validación de los campos
        let valid = isFormValid(formArray)
        // Envio datos a la base de datos
        if (valid) {
            let usuario = {
                'user_email': email.val().trim(),
                'user_password': password.val().trim(),
                'login' : 'ok'
            }
            $.post('php/database/login/loginUser.php', usuario, showLoginStatus, 'json')
        } else {
            alert('The form has an error.')
        }
    })

    function isFormValid (form = []) {
        return form.every((element) => $(element).hasClass('valid'))
    }

    function showLoginStatus (response) {

        let status = response.status
        let message = response.message
        let errors = response.errors || {}

        showMessage(status, message, errors);

        $('#messageStatus-close').on('click', {}, () => {
            if (!$('#messageStatus-close').hasClass('error-credentials')) {
                $('#messageStatus').remove()
                window.location.href = 'index.php'
            } else {
                $('#messageStatus').remove()
            }
        })

    }

})