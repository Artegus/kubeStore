import { logOut } from './utils/logOut.js'
import { openUserSettings } from './utils/settingsUser.js'
import { updateCounterCart } from './index.js'
import { updateUserTables } from './utils/panelControl/user.js'
import { updateProductsTable } from './utils/panelControl/product.js'
import { updateHistoryOfProductsTable } from './utils/panelControl/historyProduct.js'
import { updateHistorySalesTable } from './utils/panelControl/sale.js'

window.onload = (function() {
    
    // Principal set up
    updateCounterCart()

    var buttonLogOut = $('.btn-logout')
    var buttonUserSettings = $('.btn-user')

    buttonLogOut.on('click', {}, logOut)

    buttonUserSettings.on('click', { 'user_id': buttonUserSettings.data('id') }, openUserSettings)
    // Principal set up

    $('.table-user').on('click', {}, updateUserTables)
    $('.table-products').on('click', {}, updateProductsTable)
    $('.table-sales').on('click', {}, updateHistorySalesTable)
    $('.table-history-products').on('click', {}, updateHistoryOfProductsTable)

})


