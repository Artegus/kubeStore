import Tabulator from 'https://unpkg.com/tabulator-tables@4.9.3/dist/js/tabulator.es2015.min.js';
import { showMessage } from '../errors.js'

function updateUserTables() {
    cleanContentTable();
    displayButtonToAddNewUser();
    displayTableUser();
    displayTableHistoryOfUser();
}

function cleanContentTable() {
    $('.content-tables').empty()
    $('.control-panel-add-product').remove()
    $('.control-panel-edit-user').remove();
}

function displayButtonToAddNewUser() {

    $('<button class="btn btn-success" >Add new user</button>')
        .appendTo('.content-tables')
        .on('click', {}, showAddUser)

}

function showAddUser() {

    $('.control-panel-edit-user').remove();
    // Template panel
    $(`<div class='control-panel-edit-user'>
        <h4>Create new user</h4>
        <div class='settings-user-input'>
            <label for='name'>Name</label> 
            <input type='text' id='name' name='name' />
        </div>
        <div class='settings-user-input'>
            <label for='surname'>Surname</label> 
            <input type='text' id='surname' name='surname'/>
        </div>
        <h4 class="mb-3">Select gender</h4>
            <input id="male" name="gender" type="radio" class="form-check-input" value="1" required>
            <label class="form-check-label" for="male">Male</label>
            
            <input id="female" name="gender" type="radio" class="form-check-input" value="2">
            <label class="form-check-label" for="female">Female</label>

            <input id="none" name="gender" type="radio" class="form-check-input" value="3" checked>
            <label class="form-check-label" for="none">None</label>
        <h4 class="mb-3">Select rol</h4>
        <select id='user_rol'>
            <option value="1">Default user</option>
            <option value="2">Administrator</option>
        </select>
        <div class='settings-user-input'>
            <label for='address'>Address</label> 
            <input type='text' id='address' name='address'/>
        </div>
        <div class='settings-user-input'>
            <label for='email'>Email</label> 
            <input type='text' id='email' name='email'/>
        </div>
        <div class='settings-user-input'>
            <label for='password'>Password</label> 
            <input type='password' id='password' name='password' placeholder='*****'/>
        </div>
        <div class='settings-user-input'>
            <label for='repassword'>Password</label> 
            <input type='password' id='repassword' name='repassword' placeholder='*****'/>
        </div>
        <hr/>

        <input type="button" name="AddUser" value="Add user" id="addUser" class="btn btn-outline-success">
        <input type="button" value="Close" id="close-settings" class="btn btn-outline-danger">

    </div>`).appendTo('#main');

    // Close pannel
    $('#close-settings').on('click', {}, () => {
        $('.control-panel-edit-user').remove()
    })
    // Show error on inputs
    checkChangesNewUser()

    $('#addUser').on('click', {}, addUser)

}

function manageUser(event) {

    const user = event.data.user

    $('.control-panel-edit-user').remove();
    // Panel template
    $(`<div class='control-panel-edit-user'>
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
        <div class='settings-user-input'>
            <label for='email'>Email</label> 
            <input class='valid' type='text' id='email' name='email' value='${user.user_email}'/>
        </div>
        <hr/>
        <input type="button" value="Change the password" id="change-password" class="btn btn-outline-success">
        <div class='settings-user-password'>
            <div class='settings-user-input'>
                <label for='newPassword'>New Password</label> 
                <input type='password' id='newPassword' name='newPassword' placeholder='*****'/>
            </div>
        </div>
        <hr/>
        <input type="button" value="Delete account" id="delete-account" class="btn btn-outline-danger">
        <div class='settings-delete-account'>
            <p>Are you sure to delete your account?</p>
            <div class='settings-user-input'>
                <button type='button' id='deleteAcc' class="btn btn-outline-danger">Yes</button>
                <button type='button' id='close-delete-account' class="btn btn-outline-success">No</button>
            </div>
        </div>
        <hr/>

        <input type="button" name="saveChanges" value="Save Changes" id="saveChanges" class="btn btn-outline-success">
        <input type="button" value="Close" id="close-settings" class="btn btn-outline-danger">

    </div>`).appendTo('#main');
    // Close pannel
    $('#close-settings').on('click', {}, () => {
        $('.control-panel-edit-user').remove()
    })
    // Open / Close change password
    $('#change-password').on('click', {}, () => {
        $('.settings-user-password').toggle()
        if ($('#change-password').prop('value') == 'Change the password') {
            $('#change-password').prop('value', 'Close password option')
        } else {
            $('#change-password').prop('value', 'Change the password')
        }
    })
    // Show errors on inputs
    checkChanges()

    // Open / Close delete account
    $('#delete-account').on('click', {}, () => {
        $('.settings-delete-account').toggle()
        if ($('#delete-account').prop('value') == 'Delete account') {
            $('#delete-account').prop('value', 'Go back')
        } else {
            $('#delete-account').prop('value', 'Delete account')
        }
    })
    // Open / Close delete account
    $('#close-delete-account').on('click', {}, () => {
        $('.settings-delete-account').toggle()
        $('#delete-account').prop('value', 'Delete account')
    })
    // Delete account
    $('#deleteAcc').on('click', { 'id': user.user_id, 'actual_user': $('.btn-user').data('id') }, deleteAccount)
    // Edit User
    $('#saveChanges').on('click', { 'user_id': user.user_id }, editUser)




}

function deleteAccount(event) {

    var id = event.data.id
    var actualUserId = event.data.actual_user

    if (actualUserId != id) {
        $.post('php/database/user/deleteAccount.php', { 'id': id, 'delete': 'ok' }, checkDeleteStatus, 'json')
    } else {
        alert('You cannot eliminate yourself')
    }

}

function editUser(event) {
    var userId = event.data.user_id

    if ($('.settings-user-password').is(':hidden')) { // enviar cambios si cambio de contraseña.
        let formArray = $('.settings-user-input input:visible').toArray()

        let valid = formArray.every((element) => $(element).hasClass('valid'))

        if (valid) {
            let usuario = {
                'user_id': userId,
                'user_name': formArray[0].value.trim(),
                'user_surname': formArray[1].value.trim(),
                'user_address': formArray[2].value.trim(),
                'user_email': formArray[3].value.trim()
            }
            console.log(usuario, 'normal')
            $.post('php/database/panelControl/updateUser.php', usuario, showChangeStatus, 'json')
        } else {
            alert('You have an error in the changes.')
        }

    } else { // Cambios con contraseña.

        let formArray = $('.settings-user-input input:visible').toArray()

        let valid = formArray.every((element) => $(element).hasClass('valid'))

        if (valid) {
            let usuario = {
                'user_id': userId,
                'user_name': formArray[0].value.trim(),
                'user_surname': formArray[1].value.trim(),
                'user_address': formArray[2].value.trim(),
                'user_email': formArray[3].value.trim(),
                'user_newPassword': formArray[4].value,
            }
            console.log(usuario, 'contraseña')
            $.post('php/database/panelControl/updateUser.php', usuario, showChangeStatus, 'json')
        } else {
            alert('You have an error in changes')
        }

    }

}

function checkDeleteStatus(response) {
    var { status, message } = response

    if (status == 'ok') {
        alert('User has been deleted')
        $('.control-panel-edit-user').remove();
        displayTableUser()
    } else {
        alert(message)
        updateUserTables()
    }

}

function showChangeStatus(data) {

    let status = data.status
    let message = data.message
    let errors = data.errors || {}

    if (status == 'ok') {
        displayTableUser();
        $('.control-panel-edit-user').remove();
    }

    showMessage(status, message, errors)

    $('#messageStatus-close').on('click', {}, () => {
        $('#messageStatus').remove()
    })

}

function checkChanges() {
    // Para guardar los cambios
    // deben estar todos los campos rellenos (newPassword?)
    // Los campos de nombre y apellido solo permiten letras y espacios
    // El campo de direccion permite letras, numeros y espacios.
    // El campo para cambiar la contraseña necesita que cumpla los requisitos

    const name = $('#name')
    const surname = $('#surname')
    const address = $('#address')
    const email = $('#email')
    const newPassword = $('#newPassword')

    var errorIcon = `<i class="fas fa-exclamation-circle"></i>`;

    var formArray = [name, surname, address, email, newPassword]

    name.on('blur', {}, (e) => {
        let value = e.target.value
        let valueTrimmed = value.trim()

        $('.error-name').remove()

        if (valueTrimmed == '') {
            name.removeClass('valid')
            name.after(`<div class='error error-name'>Insert your name. ${errorIcon}</div>`).empty()
        } else if (!/[a-zA-záéíúóöüïëäÁÉÍÓÚñÑ\s]+/.test(valueTrimmed)) {
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
        } else if (!/[a-zA-záéíúóöüïëäÁÉÍÓÚñÑ\s]+/.test(valueTrimmed)) {
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
        } else if (!/^[a-zA-záéíúóöüïëäÁÉÍÓÚñÑ0-9\s]+$/.test(valueTrimmed)) {
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

        if (!/^(?=.*[a-záéíóúñ])(?=.*[A-ZÁÉÍÓÚÑ])(?=.*\d)[a-záéíóúñA-ZÁÉÍÓÚÑ\d]{8,}$/.test(value)) {
            newPassword.removeClass('valid')
            newPassword.after(`<div class='error error-newPassword'>Only letters and numbers are allowed. newPassword required minimum 8 characters, at least one uppercase letter, one lowercase letter and one number. ${errorIcon}</div>`).empty()
        } else {
            newPassword.addClass('valid')
            $('.error-newPassword').remove()
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

}

function checkChangesNewUser() {

    const name = $('#name')
    const surname = $('#surname')
    const address = $('#address')
    const email = $('#email')
    const password = $('#password')
    const confirmPassword = $('#repassword')

    var errorIcon = `<i class="fas fa-exclamation-circle"></i>`;

    name.on('blur', {}, (e) => {
        let value = e.target.value
        let valueTrimmed = value.trim()

        $('.error-name').remove()

        if (valueTrimmed == '') {
            name.removeClass('valid')
            name.after(`<div class='error error-name'>Insert your name. ${errorIcon}</div>`).empty()
        } else if (!/[a-zA-záéíúóöüïëäÁÉÍÓÚñÑ\s]+/.test(valueTrimmed)) {
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
        } else if (!/[a-zA-záéíúóöüïëäÁÉÍÓÚñÑ\s]+/.test(valueTrimmed)) {
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

}

function addUser(e) {
    e.preventDefault()
    let formArray = $('.settings-user-input input:visible').toArray()
    // Verifico validación de los campos
    let valid = formArray.every((element) => $(element).hasClass('valid'))
    // Envio datos a la base de datos
    if (valid) {
        let usuario = {
            'user_name': formArray[0].value.trim(),
            'user_surname': formArray[1].value.trim(),
            'user_gender': $('input[name="gender"]:checked').val().trim(),
            'user_rol': $('#user_rol').val().trim(),
            'user_address': formArray[2].value.trim(),
            'user_email': formArray[3].value.trim(),
            'user_password': formArray[4].value.trim()
        }
        console.log(usuario)
        $.post('php/database/panelControl/addNewUser.php', usuario, showNewUserStatus, 'json')
    } else {
        alert('The form has an error.')
    }
}

function showNewUserStatus (reponse) {

    let status = reponse.status
    let message = reponse.message
    let errors = reponse.errors || {}

    if (status == 'ok') {
        updateUserTables()
        $('.control-panel-edit-user').remove();
    } else {

    }

    showMessage(status, message, errors);

    $('#messageStatus-close').on('click', {}, () => {
        $('#messageStatus').remove()
    })

}

function displayTableUser() {

    $('.table-user-header').remove()
    $(`<div id="table-user"></div>`).appendTo('.content-tables')

    var table = new Tabulator("#table-user", {
        layout: "fitColumns",
        pagination: 'local',
        paginationSize: 6,
        paginationSizeSelector: [3, 6, 8, 10],
        movableColumns: true,
        ajaxURL: "php/database/panelControl/panelControl.php",
        ajaxParams: { 'table': 'user' },
        placeholder: "No Data Set",
        columns: [
            { title: "Name", field: "user_name", sorter: "string", width: 150 },
            { title: "Surname", field: "user_surname", sorter: "string" },
            { title: "Gender", field: "user_gender", sorter: "string", width: 80 },
            { title: "Address", field: "user_address", hozAlign: "center" },
            { title: "Email", field: "user_email", sorter: "string", hozAlign: "center" },
            { title: "Permissions", field: "user_rol", sorter: "string", hozAlign: "center" },
            { title: "Created at", field: "user_createdAt", sorter: "date", sorterParams: { format: "YY-MM-DD " }, hozAlign: "center" },
            { title: "Manage", formatter: buttonManageUser, headerSort: false, width: 100, hozAlign: "center" },
        ],
    });
    /* Independiente */
    function buttonManageUser(cell) { //plain text value
        let user = cell._cell.row.data
        let rol = user.user_rol
        var button = $('<button class="btn btn-outline-dark" type="button"><i class="fas fa-cog"></i></button>')

        button.on('click', { 'user': user }, manageUser)

        return button[0]
    };
    /* Independiente */

    $(`<h2 class='table-user-header'>Actual users</h2>`).insertBefore('#table-user')
}

function displayTableHistoryOfUser() {

    $('.table-user-history-header').remove()
    $(`<div id="table-user-history"></div>`).appendTo('.content-tables')

    var tableHistoryUser = new Tabulator("#table-user-history", {
        layout: "fitColumns",
        pagination: 'local',
        paginationSize: 6,
        paginationSizeSelector: [3, 6, 8, 10],
        movableColumns: true,
        ajaxURL: "php/database/panelControl/panelControl.php",
        ajaxParams: { 'table': 'historyUser' },
        placeholder: "No Data Set",
        columns: [
            { title: "Email", field: "back_user_email", sorter: "string", width: 200 },
            { title: "Created at", field: "back_user_createdAt", sorter: "date", sorterParams: { format: "YY-MM-DD " }, hozAlign: "center" },
            { title: "Delete", formatter: buttonDeleteRegister, headerSort: false, width: 100, hozAlign: "center" }
        ],
    });

    // TODO:
    // Añadir opción de borrar
    function buttonDeleteRegister(cell) {
        let data = cell._cell.row.data
        var button = $('<button class="btn btn-outline-dark" type="button"><i class="fas fa-trash-alt"></i></button>')

        button.on('click', { 'register_id': data.back_user_id }, removeRegister)

        return button[0]
    }

    $('<h2 class="table-user-history-header">History of user registrations</h2>').insertBefore('#table-user-history')
}

function removeRegister(event) {
    var registerId = event.data.register_id

    if (registerId != ' ') {
        $.post('php/database/panelControl/removeBackupRegister.php', { 'register_id': registerId }, showRemoveStatus, 'json')
    }
}

function showRemoveStatus(response) {

    var status = response.status
    var message = response.message

    if (status == 'ok') {
        alert(message)
        displayTableHistoryOfUser()
    } else {
        alert(message)
    }

}


export { updateUserTables }