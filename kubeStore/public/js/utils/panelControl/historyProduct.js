import Tabulator from 'https://unpkg.com/tabulator-tables@4.9.3/dist/js/tabulator.es2015.min.js';
import { showMessage } from '../errors.js'

function updateHistoryOfProductsTable() {
    cleanContentTable();
    displayTableHistoryOfProducts();
}

function cleanContentTable() {
    $('.content-tables').empty()
    $('.control-panel-add-product').remove()
    $('.control-panel-edit-user').remove();
}

function displayTableHistoryOfProducts () {
    
    $('.table-product-history-header').remove()
    $(`<div id="table-product-history"></div>`).appendTo('.content-tables')

    var table = new Tabulator("#table-product-history", {
        layout: "fitColumns",
        pagination: 'local',
        paginationSize: 3,
        paginationSizeSelector: [3, 6, 8, 10],
        movableColumns: true,
        ajaxURL: "php/database/panelControl/panelControl.php",
        ajaxParams: { 'table': 'backupProduct' },
        placeholder: "No Data Set",
        columns: [
            { title: "Name", field: "back_product_name", sorter: "string", vertAlign: 'middle', hozAlign: 'center'},
            { title: "Price", field: "back_product_price", sorter: "number", vertAlign: 'middle', hozAlign: 'center', formatter : 'money', formatterParams : { symbol : ' €', symbolAfter : 'p', precision : false}},
            { title: "Manage", formatter: buttonRemoveProductHistory, headerSort: false, width: 80, vertAlign: 'middle', hozAlign: 'center'},
        ],
    });
    /* Independiente */
    function buttonRemoveProductHistory(cell) { //plain text value
        let product = cell._cell.row.data
        var button = $('<button class="btn btn-outline-dark" type="button"><i class="fas fa-trash-alt"></i></button>')

        button.on('click', { 'product': product }, removeProductHistory)

        return button[0]
    };
    /* Independiente */

    $(`<h2 class='table-product-history-header'>History of products</h2>`).insertBefore('#table-product-history')
}

function removeProductHistory (event) {
    var product = event.data.product
    console.log(product)
}

export { updateHistoryOfProductsTable }