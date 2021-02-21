import { showMessage } from './utils/errors.js'

window.onload = (function () {

    $('#registerForm')[0].reset()


    const registerButton = $("#submit")
    const firstName = $('#firstName')
    const lastName = $('#lastName')
    const address = $('#address')
    const email = $('#email')
    const password = $('#password')
    const confirmPassword = $('#repassword')

    var errorIcon = `<i class="fas fa-exclamation-circle"></i>`;

    var formArray = [firstName, lastName, address, email, password, confirmPassword]

    firstName.on('blur', {}, (e) => {
        let value = e.target.value
        let valueTrimmed = value.trim()

        $('.error-firstname').remove()

        if (valueTrimmed == '') {
            firstName.removeClass('valid')
            firstName.after(`<div class='error error-firstname'>Insert your first name.${errorIcon}</div>`).empty()
        } else if (!/[a-zA-záéíúóöüïëäÁÉÍÓÚñÑ\s]+/.test(valueTrimmed)) {
            firstName.removeClass('valid')
            firstName.after(`<div class='error error-firstname'>Please enter only letters.${errorIcon}</div>`).empty()
        } else {
            firstName.addClass('valid')
            $('.error-firstname').remove()
        }
    })

    lastName.on('blur', {}, (e) => {
        let value = e.target.value
        let valueTrimmed = value.trim()

        $('.error-lastname').remove()

        if (valueTrimmed == '') {
            lastName.removeClass('valid')
            lastName.after(`<div class='error error-lastname'>Insert your last name.${errorIcon}</div>`).empty()
        } else if (!/[a-zA-záéíúóöüïëäÁÉÍÓÚñÑ\s]+/.test(valueTrimmed)) {
            lastName.removeClass('valid')
            lastName.after(`<div class='error error-lastname'>Please enter only letters.${errorIcon}</div>`).empty()
        } else {
            lastName.addClass('valid')
            $('.error-lastname').remove()
        }
    })

    address.on('blur', {}, (e) => {
        let value = e.target.value
        let valueTrimmed = value.trim()

        $('.error-address').remove()

        if (valueTrimmed == '') {
            address.removeClass('valid')
            address.after(`<div class='error error-address'>Insert your address line.${errorIcon}</div>`).empty()
        } else if (!/^[a-zA-záéíúóöüïëäÁÉÍÓÚñÑ0-9\s]+$/.test(valueTrimmed)) {
            address.removeClass('valid')
            address.after(`<div class='error error-address'>Only letters, numbers and spaces are allowed.${errorIcon}</div>`).empty()
        } else {
            address.addClass('valid')
            $('.error-address').remove()
        }
    })

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

        $('.error-password').remove()

        if (!/^(?=.*[a-záéíúóñ])(?=.*[A-ZÁÉÍÓÚÑ])(?=.*\d)[a-záéíúóñA-ZÁÉÍÓÚÑ\d]{8,}$/.test(value)) {
            password.removeClass('valid')
            password.after(`<div class='error error-password'>Only letters and numbers are allowed. Password required minimum 8 characters, at least one uppercase letter, one lowercase letter and one number.${errorIcon}</div>`).empty()
        } else {
            password.addClass('valid')
            $('.error-password').remove()
        }

    })

    confirmPassword.on('blur', {}, (e) => {
        let password = $('#password').val()
        let value = e.target.value

        $('.error-repassword').remove()

        if (value != password) {
            confirmPassword.removeClass('valid')
            confirmPassword.after(`<div class='error error-repassword'>Passwords do not match. Try again.${errorIcon}</div>`).empty()
        } else {
            confirmPassword.addClass('valid')
            $('.error-repassword').remove()
        }

    })

    registerButton.on('click', {}, (e) => {
        // Evito que recargue la página
        e.preventDefault()
        // Verifico validación de los campos
        let valid = formArray.every((element) => $(element).hasClass('valid'))
        // Envio datos a la base de datos
        if (valid) {
            let usuario = {
                'user_name': firstName.val().trim(),
                'user_surname': lastName.val().trim(),
                'user_gender': $('input[name="gender"]:checked').val().trim(),
                'user_address': address.val().trim(),
                'user_email': email.val().trim(),
                'user_password': password.val().trim()
            }
            $.post('php/database/register/registerNewUser.php', usuario, showRegisterStatus, 'json')
        } else {
            alert('The form has an error.')
        }
    })

})


function showRegisterStatus(data) {

    let status = data.status
    let message = data.message
    let errors = data.errors || {}

    showMessage(status, message, errors);

    $('#messageStatus-close').on('click', {}, () => {
        $('#messageStatus').remove()
    })

}