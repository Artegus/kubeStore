import { showMessage } from './errors.js'

function openUserSettings (event) {

    let id = event.data.user_id

    $.getJSON('php/database/user/getUserById.php', {'user_id' : id}, showSettings)

}

function showSettings (user) {
    
    var userData = user;
    console.log(user)

    $('.settings-user').remove();

    $(`<div class='settings-user'>
        <h4>User details</h4>
        <div class='settings-user-input'>
            <label for='name'>Name</label> 
            <input class='valid' type='text' id='name' name='name' value='${user.user_name}'/>
        </div>
        <div class='settings-user-input'>
            <label for='surname'>Surname</label> 
            <input class='valid' type='text' id='surname' name='surname' value='${user.user_surname}'/>
        </div>
        <div class='settings-user-input'>
            <label for='address'>Address</label> 
            <input class='valid' type='text' id='address' name='address' value='${user.user_address}'/>
        </div>
        <hr/>
        <input type="button" value="Also change the password" id="change-password" class="btn btn-outline-success">
        <div class='settings-user-password'>
            <div class='settings-user-input'>
                <label for='newPassword'>New Password</label> 
                <input type='password' id='newPassword' name='newPassword' placeholder='*****'/>
            </div>
            <div class='settings-user-input'>
                <label for='actualPassword'>Actual Password</label> 
                <input type='password' id='actualPassword' name='actualPassword' placeholder='*****'/>
            </div>
        </div>
        <hr/>

        <input type="button" name="saveChanges" value="Save Changes" id="saveChanges" class="btn btn-outline-success">
        <input type="button" value="Close" id="close-settings" class="btn btn-outline-danger">

    </div>`).appendTo('#main');

    $('#close-settings').on('click', {} , () => {
        $('.settings-user').remove()
    })

    $('#change-password').on('click', {}, () => {
        $('.settings-user-password').toggle()
        if ($('#change-password').prop('value') == 'Also change the password') {
            $('#change-password').prop('value', 'Close password option')
        } else {
            $('#change-password').prop('value', 'Also change the password')
        }
    })

    checkChanges()

    $('#saveChanges').on('click', {}, () => {

        if ($('.settings-user-password').is(':hidden')) { // enviar cambios si cambio de contraseña.
            let formArray = $('.settings-user-input input:visible').toArray()

            let valid = formArray.every((element) => $(element).hasClass('valid'))

            if (valid) {
                let usuario = {
                    'user_id' : user.user_id,
                    'user_name': formArray[0].value.trim(),
                    'user_surname': formArray[1].value.trim(),
                    'user_address': formArray[2].value.trim(),
                }
                console.log(usuario)
                $.post('php/database/user/updateUser.php', usuario, showChangeStatus, 'json')
            } else {
                alert('You have an error in the changes.')
            }

        } else { // Cambios con contraseña.

            let formArray = $('.settings-user-input input:visible').toArray()

            let valid = formArray.every((element) => $(element).hasClass('valid'))

            if (valid) {
                let usuario = {
                    'user_id' : user.user_id,
                    'user_name': formArray[0].value.trim(),
                    'user_surname': formArray[1].value.trim(),
                    'user_address': formArray[2].value.trim(),
                    'user_newPassword' : formArray[3].value,
                    'user_actualPassword' : formArray[4].value
                }
                console.log(usuario)
                $.post('php/database/user/updateUser.php', usuario, showChangeStatus, 'json')
            } else {
                alert('You have an error in changes')
            }

        }

    })

}

function showChangeStatus (data) {
    
    let status = data.status
    let message = data.message
    let errors = data.errors || {}

    showMessage(status, message, errors)

    $('#messageStatus-close').on('click', {}, () => {
        $('#messageStatus').remove()
    })

}


function checkChanges () {
    // Para guardar los cambios
    // deben estar todos los campos rellenos (newPassword?)
    // Los campos de nombre y apellido solo permiten letras y espacios
    // El campo de direccion permite letras, numeros y espacios.
    // El campo para cambiar la contraseña necesita que cumpla los requisitos

    const name = $('#name')
    const surname = $('#surname')
    const address = $('#address')
    const newPassword = $('#newPassword')
    const actualPassword = $('#actualPassword')

    var errorIcon = `<i class="fas fa-exclamation-circle"></i>`;

    var formArray = [name, surname, address, newPassword, actualPassword]

    name.on('blur', {}, (e) => {
        let value = e.target.value
        let valueTrimmed = value.trim()

        $('.error-name').remove()

        if (valueTrimmed == '') {
            name.removeClass('valid')
            name.after(`<div class='error error-name'>Insert your name. ${errorIcon}</div>`).empty()
        } else if (!/[a-zA-záéíúóöüïëäÁÉÍÓÚ\s]+/.test(valueTrimmed)) {
            name.removeClass('valid')
            name.after(`<div class='error error-name'>Please enter only letters. ${errorIcon}</div>`).empty()
        } else {
            name.addClass('valid')
            $('.error-name').remove()
        }
    })

    surname.on('blur', {}, (e) => {
        let value = e.target.value
        let valueTrimmed = value.trim()

        $('.error-surname').remove()

        if (valueTrimmed == '') {
            surname.removeClass('valid')
            surname.after(`<div class='error error-surname'>Insert your surname. ${errorIcon}</div>`).empty()
        } else if (!/[a-zA-záéíúóöüïëäÁÉÍÓÚ\s]+/.test(valueTrimmed)) {
            surname.removeClass('valid')
            surname.after(`<div class='error error-surname'>Please enter only letters. ${errorIcon}</div>`).empty()
        } else {
            surname.addClass('valid')
            $('.error-surname').remove()
        }
    })

    address.on('blur', {}, (e) => {
        let value = e.target.value
        let valueTrimmed = value.trim()

        $('.error-address').remove()

        if (valueTrimmed == '') {
            address.removeClass('valid')
            address.after(`<div class='error error-address'>Insert your address line.${errorIcon}</div>`).empty()
        } else if (!/^[a-zA-záéíúóöüïëäÁÉÍÓÚ0-9\s]+$/.test(valueTrimmed)) {
            address.removeClass('valid')
            address.after(`<div class='error error-address'>Only letters, numbers and spaces are allowed.${errorIcon}</div>`).empty()
        } else {
            address.addClass('valid')
            $('.error-address').remove()
        }
    })

    newPassword.on('blur', {}, (e) => {
        let value = e.target.value

        $('.error-newPassword').remove()

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
            newPassword.removeClass('valid')
            newPassword.after(`<div class='error error-newPassword'>Only letters and numbers are allowed. newPassword required minimum 8 characters, at least one uppercase letter, one lowercase letter and one number. ${errorIcon}</div>`).empty()
        } else {
            newPassword.addClass('valid')
            $('.error-newPassword').remove()
        }

    })

    actualPassword.on('blur', {}, (e) => {
        let value = e.target.value

        $('.error-actualPassword').remove()

        if (!/.+/.test(value)) {
            actualPassword.removeClass('valid')
            actualPassword.after(`<div class='error error-actualPassword'>Please enter your actual password. ${errorIcon}</div>`).empty()
        } else {
            actualPassword.addClass('valid')
            $('.error-actualPassword').remove()
        }

    })

}



export { openUserSettings }