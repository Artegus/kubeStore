import Tabulator from 'https://unpkg.com/tabulator-tables@4.9.3/dist/js/tabulator.es2015.min.js';
import { showMessage } from '../errors.js'

function updateProductsTable() {
    cleanContentTable();
    displayButtonToAddNewProduct();
    displayTableProducts();
    displayTableCategories();
    displayTableBrands();
}

function cleanContentTable() {
    $('.content-tables').empty()
    $('.control-panel-add-product').remove()
    $('.control-panel-edit-user').remove();
}

function displayButtonToAddNewProduct() {
    $('<button class="btn btn-success" >Add new product</button>')
        .appendTo('.content-tables')
        .on('click', {}, openProductManage)
}

function openProductManage() {
    showAddProduct()
    // Charge Brands
    $.getJSON('php/database/panelControl/panelControl.php', { 'table': 'category' }, loadCategories)
    $.getJSON('php/database/panelControl/panelControl.php', { 'table': 'brand' }, loadBrands)
}

function showAddProduct() {

    $('.control-panel-add-product').remove();
    // Template panel
    $(`<div class='control-panel-add-product'>
    <form id="formProduct" enctype="multipart/form-data">
        <h4>Create new Product</h4>
        <div class='settings-user-input'>
            <label for='name'>Name</label> 
            <input type='text' id='name' name='product_name' />
        </div>
        <div class='settings-user-input'>
            <label for='price'>Price</label> 
            <input type='number' id='price' step="0.01" placeholder="1.00" name='product_price'/>
        </div>
        <div class='settings-user-input'>
            <label for='amount'>Amount</label> 
            <input type='text' id='amount' name='product_amount'/>
        </div>
        <div class='settings-user-input'>
            <label for='description'>Description</label> 
            <textarea id='description' name='product_description'></textarea>
        </div>
        <h6 class="mb-3">Select product category</h6>
            <select id='category-select' name='product_category'>

            </select>
        <h6 class="mb-3">Select product brand</h6>
        <select id='brand-select' name='product_brand'>
            
        </select>
        
            <div class='settings-user-input'>
                <label for='image'>Product photo</label> 
                <input type='file' id='image' name='image'/>
            </div>
        <hr/>

        <input type="button" name="addProduct" value="Add product" id="addProduct" class="btn btn-outline-success">
        <input type="button" value="Close" id="close-settings" class="btn btn-outline-danger">
    </form>
    </div>`).appendTo('#main');

    checkChanges()

    // Close pannel
    $('#close-settings').on('click', {}, () => {
        $('.control-panel-add-product').remove()
    })

    // Create new product 
    $('#addProduct').on('click', {}, addProduct)
}

function addProduct(e) {
    e.preventDefault()
    let formArray = $('.settings-user-input input:visible').toArray()
    // Verifico que los campos sean valido.
    let valid = formArray.every((element) => $(element).hasClass('valid'))
    // Instancia de FormData para enviar.
    var formData = new FormData(document.getElementById('formProduct'));

    if (valid) {
        // Envio datos 
        $.ajax({
            url         : 'php/database/panelControl/addNewProduct.php',
            dataType    : 'json',           
            cache       : false,
            contentType : false,
            processData : false,
            data        : formData,                         
            type        : 'POST',
            success     : showNewProductStatus
        });
    } else {
        alert('The form has an error.')
    }
}

function showNewProductStatus (response) {
    
    let status = response.status
    let message = response.message
    let errors = response.errors || {}

    if (status == 'ok') {
        updateProductsTable()
        $('.control-panel-add-product').remove();
    }

    showMessage(status, message, errors);

    $('#messageStatus-close').on('click', {}, () => {
        $('#messageStatus').remove()
    })
}

function checkChanges() {

    const productName = $('#name')
    const price = $('#price')
    const amount = $('#amount')
    const description = $('#description')
    const photo = $('#image')

    var errorIcon = `<i class="fas fa-exclamation-circle"></i>`;

    productName.on('blur', {}, (e) => {
        let value = e.target.value
        let valueTrimmed = value.trim()

        $('.error-name').remove()

        if (valueTrimmed == '') {
            productName.removeClass('valid')
            productName.after(`<div class='error error-name'>Insert product name. ${errorIcon}</div>`).empty()
        } else if (!/[a-zA-záéíúóöüïëäÁÉÍÓÚñÑ0-9\s]+/.test(valueTrimmed)) {
            productName.removeClass('valid')
            productName.after(`<div class='error error-name'>Please enter only letters, spaces and numbers. ${errorIcon}</div>`).empty()
        } else {
            productName.addClass('valid')
            $('.error-name').remove()
        }
    })

    price.on('blur', {}, (e) => {
        let value = +e.target.value

        $('.error-price').remove()

        if (value == '') {
            price.removeClass('valid')
            price.after(`<div class='error error-price'>Insert price of product. ${errorIcon}</div>`).empty()
        } else if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(value)) {
            price.removeClass('valid')
            price.after(`<div class='error error-price'>Please enter only numbers. Example 12.22 ${errorIcon}</div>`).empty()
        } else {
            price.addClass('valid')
            $('.error-price').remove()
        }
    })

    amount.on('blur', {}, (e) => {
        let value = +e.target.value

        $('.error-amount').remove()

        if (value == '') {
            amount.removeClass('valid')
            amount.after(`<div class='error error-amount'>Insert the quantity of the product. ${errorIcon}</div>`).empty()
        } else if (!/^[0-9]+$/.test(value)) {
            amount.removeClass('valid')
            amount.after(`<div class='error error-amount'>Only numbers are allowed. ${errorIcon}</div>`).empty()
        } else {
            amount.addClass('valid')
            $('.error-amount').remove()
        }
    })

    description.on('blur', {}, (e) => {
        let value = e.target.value
        let valueTrimmed = value.trim()

        $('.error-description').remove()

        if (valueTrimmed == '') {
            description.removeClass('valid')
            description.after(`<div class='error error-description'>Insert description. ${errorIcon}</div>`).empty()
        } else {
            description.addClass('valid')
            $('.error-description').remove()
        }

    })

    photo.on('blur', {}, (e) => {

        $('.error-photo').remove()

        if (photo.get(0).files.length == 0) {
            photo.removeClass('valid')
            photo.after(`<div class='error error-photo'>Insert one image. ${errorIcon}</div>`).empty()
        } else {
            photo.addClass('valid')
            $('.error-photo').remove()
        }
    })

    photo.on('change', {}, (e) => {
        var typeOfFile = photo.get(0).files[0].type
        
        $('.error-photo').remove()

        if (typeOfFile != 'image/jpeg') {
            photo.removeClass('valid')
            photo.after(`<div class='error error-photo'>Such files are not accepted. ${errorIcon}</div>`).empty()
        } else {
            photo.addClass('valid')
            $('.error-photo').remove()
        }
    })

}

function loadCategories(categories) {
    categories.forEach((category) => {
        $(`<option value="${category.category_id}">${category.category_name}</option>`).appendTo('#category-select')
    })
}

function loadBrands(brands) {
    brands.forEach((brand) => {
        $(`<option value="${brand.brand_id}">${brand.brand_name}</option>`).appendTo('#brand-select')
    })
}

function displayTableProducts() {

    $('.table-products-header').remove()
    $(`<div id="table-products"></div>`).appendTo('.content-tables')

    var table = new Tabulator("#table-products", {
        layout: "fitColumns",
        pagination: 'local',
        paginationSize: 3,
        paginationSizeSelector: [3, 6, 8, 10],
        movableColumns: true,
        ajaxURL: "php/database/panelControl/panelControl.php",
        ajaxParams: { 'table': 'product' },
        placeholder: "No Data Set",
        columns: [
            {
                title: "Image", field: "product_image", width: 100, headerSort: false, formatter: 'image', vertAlign: 'middle', hozAlign: 'center', formatterParams: {
                    urlPrefix: `./images/`,
                    width: 70,
                    height: 70
                }
            },
            { title: "Name", field: "product_name", sorter: "string", vertAlign: 'middle', hozAlign: 'center' },
            { title: "Amount", field: "product_amount", sorter: "number", hozAlign: "center", vertAlign: 'middle' },
            { title: "Category", field: "product_category", sorter: "number", vertAlign: 'middle', hozAlign: 'center' },
            { title: "Price", field: "product_price", sorter: "number", hozAlign: "center", vertAlign: 'middle', formatter: 'money', formatterParams: { symbol: ' €', symbolAfter: 'p', precision: false } },
            { title: "Brand", field: "product_brand", sorter: "string", vertAlign: 'middle', hozAlign: 'center' },
            { title: "Manage", formatter: buttonManageProduct, headerSort: false, width: 80, vertAlign: 'middle', hozAlign: 'center' },
        ],
    });
    /* Independiente */
    function buttonManageProduct(cell) { //plain text value
        let product = cell._cell.row.data
        var button = $('<button class="btn btn-outline-dark" type="button"><i class="fas fa-cog"></i></button>')

        button.on('click', { 'product': product }, manageProduct)

        return button[0]
    };
    /* Independiente */

    $(`<h2 class='table-products-header'>Actual Products</h2>`).insertBefore('#table-products')

}

function displayTableBrands() {

    $('.table-brands-header').remove()
    $(`<div id="table-brands"></div>`).appendTo('.content-tables')

    var table = new Tabulator("#table-brands", {
        layout: "fitColumns",
        pagination: 'local',
        paginationSize: 3,
        paginationSizeSelector: [3, 6, 8, 10],
        movableColumns: true,
        ajaxURL: "php/database/panelControl/panelControl.php",
        ajaxParams: { 'table': 'brand' },
        placeholder: "No Data Set",
        columns: [
            { title: "Name", field: "brand_name", sorter: "string", vertAlign: 'middle', hozAlign: 'center' },
            { title: "Manage", formatter: buttonManageBrand, headerSort: false, width: 80, vertAlign: 'middle', hozAlign: 'center' },
        ],
    });
    /* Independiente */
    function buttonManageBrand(cell) { //plain text value
        let brand = cell._cell.row.data
        var button = $('<button class="btn btn-outline-dark" type="button"><i class="fas fa-cog"></i></button>')

        button.on('click', { 'brand': brand }, manageBrand)

        return button[0]
    };
    /* Independiente */

    $(`<h2 class='table-brands-header'>Actual Brands</h2>`).insertBefore('#table-brands')

}

function displayTableCategories() {

    $('.table-category-header').remove()
    $(`<div id="table-category"></div>`).appendTo('.content-tables')

    var table = new Tabulator("#table-category", {
        layout: "fitColumns",
        pagination: 'local',
        paginationSize: 3,
        paginationSizeSelector: [3, 6, 8, 10],
        movableColumns: true,
        ajaxURL: "php/database/panelControl/panelControl.php",
        ajaxParams: { 'table': 'category' },
        placeholder: "No Data Set",
        columns: [
            { title: "Name", field: "category_name", sorter: "string", vertAlign: 'middle', hozAlign: 'center' },
            { title: "Manage", formatter: buttonManageCategory, headerSort: false, width: 80, vertAlign: 'middle', hozAlign: 'center' },
        ],
    });
    /* Independiente */
    function buttonManageCategory(cell) { //plain text value
        let category = cell._cell.row.data
        var button = $('<button class="btn btn-outline-dark" type="button"><i class="fas fa-cog"></i></button>')

        button.on('click', { 'category': category }, manageCategory)

        return button[0]
    };
    /* Independiente */

    $(`<h2 class='table-category-header'>Actual categories</h2>`).insertBefore('#table-category')


}

function manageCategory(event) {
    var category = event.data.category
    alert(':)')
}

function manageProduct(event) {
    var product = event.data.product
    
    $('.control-panel-edit-product').remove();

    $(`<div class='control-panel-edit-product'>
    <form id="formProduct" enctype="multipart/form-data">
        <h4>Edit Product</h4>
        <div class='settings-user-input'>
            <label for='name'>Name</label> 
            <input class="valid" type='text' id='name' name='product_name' value="${product.product_name}" />
        </div>
        <div class='settings-user-input'>
            <label for='price'>Price</label> 
            <input class="valid" type='number' id='price' step="0.01" placeholder="1.00" name='product_price' value="${product.product_price}"/>
        </div>
        <div class='settings-user-input'>
            <label for='amount'>Amount</label> 
            <input class="valid" type='text' id='amount' name='product_amount' value="${product.product_amount}"/>
        </div>
        <div class='settings-user-input'>
            <label for='description'>Description</label> 
            <textarea class="valid" name='product_description' id='description'>${product.product_description}</textarea>
        </div>
        <h6 class="mb-3">Select product category</h6>
            <select id='category-select' name='product_category'>

            </select>
        <h6 class="mb-3">Select product brand</h6>
        <select id='brand-select' name='product_brand'>
            
        </select>
        <hr/>
        <input type="button" value="Change image" id="change-image" class="btn btn-outline-success">
        <div class='settings-product-image'>
            <div class='settings-user-input'>
                <label for='image'>Product photo</label> 
                <input type='file' id='image' name='image'/>
            </div>
        </div>
        <hr/>
        <input type="button" value="Delete product" id="delete-product" class="btn btn-outline-danger">
        <div class='settings-delete-product'>
            <p>Are you sure to delete your account?</p>
            <div class='settings-user-input'>
                <button type='button' id='deleteProduct' class="btn btn-outline-danger">Yes</button>
                <button type='button' id='close-delete-product' class="btn btn-outline-success">No</button>
            </div>
        </div>
        <hr/>
        <input type="hidden" value="${product.product_id}" name="product_id"/>
        <input type="button" value="Save changes" id="saveChanges" class="btn btn-outline-success">
        <input type="button" value="Close" id="close-settings" class="btn btn-outline-danger">
    </form>
    </div>`).appendTo('#main');

    // Load selects
    loadSelectsEditProduct(product.product_brand, product.product_category)
    // Close pannel
    $('#close-settings').on('click', {}, () => {
        $('.control-panel-edit-product').remove()
    })
    // Delete product
    $('#delete-product').on('click', {}, () => {
        $('.settings-delete-product').toggle()
        if ($('#delete-product').prop('value') == 'Delete product') {
            $('#delete-product').prop('value', 'Go back')
        } else {
            $('#delete-product').prop('value', 'Delete product')
        }
    })
    // Open / Close delete product
    $('#close-delete-product').on('click', {}, () => {
        $('.settings-delete-product').toggle()
        $('#delete-product').prop('value', 'Delete Product')
    })

    // Open / Close change password
    $('#change-image').on('click', {}, () => {
        $('.settings-product-image').toggle()
        if ($('#change-image').prop('value') == 'Change image') {
            $('#change-image').prop('value', 'Close change image')
        } else {
            $('#change-image').prop('value', 'Change image')
        }
    })
    checkChanges()
    // Save changes
    $('#saveChanges').on('click', {}, saveChangesProduct )
    // Delete product
    $('#deleteProduct').on('click', { 'product_id' : product.product_id }, deleteProduct)


}

function loadSelectsEditProduct(actualProductBrand, actualProductCategory) {

    $.getJSON('php/database/panelControl/panelControl.php', { 'table': 'category' }, (categories) => {
        categories.forEach(category => {
            if (actualProductCategory == category.category_name) {                
                $(`<option value="${category.category_id}"  selected>${category.category_name}</option>`).appendTo('#category-select')    
            } else {
                $(`<option value="${category.category_id}" >${category.category_name}</option>`).appendTo('#category-select')
            }
        })
    })
    $.getJSON('php/database/panelControl/panelControl.php', { 'table': 'brand' }, (brands) => {
        brands.forEach( brand => {
            if (actualProductBrand == brand.brand_name) {
                $(`<option value="${brand.brand_id}" selected >${brand.brand_name}</option>`).appendTo('#brand-select')
            } else {
                $(`<option value="${brand.brand_id}" >${brand.brand_name}</option>`).appendTo('#brand-select')
            }
        })
    })

}

function saveChangesProduct (e) {

    e.preventDefault()
    let formArray = $('.settings-user-input input:visible').toArray()
    // Verifico que los campos sean valido.
    let valid = formArray.every((element) => $(element).hasClass('valid'))
    // Instancia de FormData para enviar.
    var formData = new FormData(document.getElementById('formProduct'));

    if (valid) {
        // Envio datos 
        if (!$('#image').is(':visible')) { // Si se envia sin imagen entonces esta se elimina de formData
            formData.delete('image')       // En caso contrario se envia con la imagen.
        }

        $.ajax({
            url         : 'php/database/panelControl/updateProduct.php',
            dataType    : 'json',           
            cache       : false,
            contentType : false,
            processData : false,
            data        : formData,                         
            type        : 'POST',
            success     : showUpdateProductStatus
        });

    } else {
        alert('The form has an error.')
    }
}

function deleteProduct (event) {
    var { product_id } = event.data
    $.post('php/database/panelControl/removeProduct.php', {'product_id' : product_id}, showDeleteProductStatus, 'json')
}

function showDeleteProductStatus (response) {
    var { status, message } = response

    if (status == 'ok') {
        alert('Product has been deleted')
        $('.control-panel-edit-product').remove();
        displayTableProducts()
    } else {
        alert(message)
        displayTableProducts()
    }
}
function showUpdateProductStatus (data) {
    
    let status = data.status
    let message = data.message
    let errors = data.errors || {}

    if (status == 'ok') {
        displayTableProducts()
        $('.control-panel-edit-product').remove();
    }

    showMessage(status, message, errors)

    $('#messageStatus-close').on('click', {}, () => {
        $('#messageStatus').remove()
    })


}

function manageBrand(event) {
    var brand = event.data.brand
    alert(':)')
}

export { updateProductsTable }