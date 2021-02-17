import { logOut } from './utils/logOut.js'
import { openUserSettings } from './utils/settingsUser.js'


window.onload = (function () {

    var buttonLogOut = $('.btn-logout')

    buttonLogOut.on('click', {}, logOut)

    buttonUserSettings.on('click', {'user_id' : buttonUserSettings.data('id')}, openUserSettings)
})
