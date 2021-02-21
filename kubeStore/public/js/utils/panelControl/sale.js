import Tabulator from 'https://unpkg.com/tabulator-tables@4.9.3/dist/js/tabulator.es2015.min.js';
import { showMessage } from '../errors.js'

function updateHistorySalesTable() {
    cleanContentTable();
    displayTableHistoryOfSales();
}

function cleanContentTable() {
    $('.content-tables').empty()
    $('.control-panel-add-product').remove()
    $('.control-panel-edit-user').remove();
}

function displayTableHistoryOfSales () {

    $('.table-sale-history-header').remove()
    $(`<div id="table-sale-history"></div>`).appendTo('.content-tables')

    var table = new Tabulator("#table-sale-history", {
        layout: "fitColumns",
        pagination: 'local',
        paginationSize: 3,
        paginationSizeSelector: [3, 6, 8, 10],
        movableColumns: true,
        ajaxURL: "php/database/panelControl/panelControl.php",
        ajaxParams: { 'table': 'sale' },
        placeholder: "No Data Set",
        columns: [
            { title: "Buyer's email", field: "sale_buyers_email", sorter: "string", vertAlign: 'middle', hozAlign: 'center'},
            { title: "Total purchase price", field: "sale_totalPrice", sorter: "number", vertAlign: 'middle', hozAlign: 'center', formatter : 'money', formatterParams : { symbol : ' €', symbolAfter : 'p', precision : false}},
            { title: "Purchase date", field: "sale_timeStamp", sorter: "date", sorterParams: { format: "YY-MM-DD " }, vertAlign: 'middle', hozAlign: 'center'},
            { title: "SaleInformation", formatter: buttonShowSaleInformation, headerSort: false, width: 80, vertAlign: 'middle', hozAlign: 'center'},
        ],
    });
    /* Independiente */
    function buttonShowSaleInformation(cell) { //plain text value
        let sale = cell._cell.row.data
        var button = $('<button class="btn btn-outline-dark" type="button"><i class="fas fa-receipt"></i></button>')

        button.on('click', { 'sale': sale }, requestSaleInformation)

        return button[0]
    };
    /* Independiente */

    $(`<h2 class="table-sale-history-header">History of sales</h2>`).insertBefore('#table-sale-history')

}


function requestSaleInformation (event) {
    
    var { 
        sale_id, 
        sale_buyers_name : buyerName, 
        sale_totalPrice : totalPrice,
        sale_timeStamp : date
    } = event.data.sale
    // Remove previous sale info container
    $('.table-sale-information').remove()
    // Create sale info container
    $(`<div class="table-sale-information">
        <div class="title-receipt">
            <div>
                <h4>Receipt of ${buyerName}</h4>
                <h5>Total payable ${totalPrice} €</h5>
                <h6>Date ${date}</h6>
            </div>
            <button class='close-sale-info btn btn-outline-danger'><i class="fas fa-times"></i></button>
        <div>
    </div>`).appendTo('#main')
    // Close sale info
    $('.close-sale-info').on('click', {}, () => {
        $('.table-sale-information').remove()
    })
    // Add Table
    $(`<div id="table-sale-info"></div>`).appendTo('.table-sale-information')

    var table = new Tabulator("#table-sale-info", {
        layout: "fitColumns",
        pagination: 'local',
        paginationSize: 3,
        paginationSizeSelector: [3, 6, 8, 10],
        movableColumns: true,
        ajaxURL: "php/database/panelControl/panelControl.php",
        ajaxParams: { 'table': 'saleInfo', 'sale_id' : sale_id},
        placeholder: "No Data Set",
        columns: [
            { title: "Product", field: "sale_product_name", sorter: "string", vertAlign: 'middle', hozAlign: 'center'},
            { title: "Amount", field: "sale_product_amount", sorter: "number", vertAlign: 'middle', hozAlign: 'center'},
            { title: "Product price x Amount of product", field: "sale_product_totalPrice", sorter: "number", vertAlign: 'middle', hozAlign: 'center', formatter : 'money', formatterParams : { symbol : ' €', symbolAfter : 'p', precision : false}},
        ],
    });


}

export { updateHistorySalesTable }