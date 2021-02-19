import { logOut } from './utils/logOut.js'
import { openUserSettings } from './utils/settingsUser.js'
import { Storage } from './localStorage/Storage.js'
import { updateCounterCart } from './index.js'
import { makePurchase } from './utils/buy.js'

var listOfProductsCart = Storage.getCart();
var listOfProductsHTML = []
var listOfProducts = []

window.onload = (function () {

    getAllProducts()

    var buttonLogOut = $('.btn-logout')
    var buttonUserSettings = $('.btn-user')

    buttonLogOut.on('click', {}, logOut)

    buttonUserSettings.on('click', { 'user_id': buttonUserSettings.data('id') }, openUserSettings)

})

function getAllProducts() {
    $.getJSON('php/database/products/getProducts.php', { 'products': 'ok' }, saveProducts);
}

function clearContentProducts() {
    $('.content-products-cart').empty()
    $('.sub-total-content').remove()
}

function saveProducts([products, brands]) {
    listOfProducts = products;
    showCartItems()
}

function modifyAmountOfProduct(event) {

    var products = Storage.getCart()
    var type = event.target.innerText
    var idProduct = $(event.target).data('id')

    var productSelected = products.find(({ product_id }) => product_id == idProduct)
    var productPosition = products.findIndex(({ product_id }) => product_id == idProduct)

    if (type == '+') {
        productSelected.product_amount += 1;
    } else {
        if (productSelected.product_amount != 1) {
            productSelected.product_amount -= 1;
        }
    }

    products.splice(productPosition, productSelected)

    Storage.saveCart(products)

    showCartItems()
}


export function showCartItems() {

    var products = Storage.getCart()

    clearContentProducts()

    updateCounterCart()

    if (products.length > 0) {

        listOfProductsHTML = products.map((product) => productInCartModel(product))

        listOfProductsHTML.forEach((productHTML) => productHTML.appendTo('.content-products-cart'))

        let subTotalCartHTML = subTotalCart(products)

        subTotalCartHTML.appendTo('.content-products')

        // Añadir funcion para aumentar o reducir la cantidad de productos
        $('.amount-up').on('click', {}, modifyAmountOfProduct)
        $('.amount-down').on('click', {}, modifyAmountOfProduct)
        $('.btn-delete').on('click', {}, deleteItemFromCart)
        $('.btn-buy').on('click', {'products' : Storage.getCart(), 'user_id' : $('.btn-user').data('id')}, makePurchase)

    } else {
        $('<h1>You have not added any cubes yet</h1><img src="./images/empty_cart.svg"/ >').appendTo('.content-products-cart')
    }

}

function getProductById(id = '') {
    return listOfProducts.find(({ product_id }) => product_id == id)
}

function deleteItemFromCart (event) {
    
    var products = Storage.getCart()
    var idProduct = $(event.target).data('id')

    var productPosition = products.findIndex(({ product_id }) => product_id == idProduct)

    products.splice(productPosition, 1)

    Storage.saveCart(products)

    showCartItems()
}   

function subTotalCart(products = []) {

    let totalProducts = products.reduce( ( sum, {product_amount}) => sum + product_amount, 0)

    let totalPrice =  products.reduce( ( sum, { product_amount, product_price } ) => sum + (product_amount * product_price) , 0).toFixed(2)

    return $(`
    <div class="col-sm-3 sub-total-content">
        <div class="sub-total border text-center mt-2">
            <h6 class="text-success py-3">Your order is ready to buy</h6>
            <div class="border-top py-4">
                <h7 class="">Subtotal (${totalProducts} products)<span class="text-danger" id="total-price">${totalPrice}</span> €</h7>
            </div>
            <button type="button" class="btn btn-success btn-buy">Buy</button>
        </div>
    </div>
    `)
}

function productInCartModel(product) {

    return $(`
    <div class="row border-top py-3 mt-3">
        <div class="col-sm-2">
            <img src="./images/${product.product_image}" alt="cart_item_${product.product_id}" class="img-fluid">
        </div>
        <div class="col-sm-8">
            <h6>${product.product_name}</h6>
            <h6>Brand: ${product.product_brand}</h6>
            <!-- Amount -->
            <div class="qty d-flex pt-2">
                <div class="d-flex w-25">
                    <button class="amount-down border bg-light" data-id=${product.product_id}>-</button>
                    <input type="text" class="qty_input border px-2 w-50 bg-light" disabled value="${product.product_amount}">
                    <button class="amount-up border bg-light" data-id=${product.product_id}>+</button>
                </div>
                <button type="submit" class="btn btn-outline-danger btn-delete px-3 m-auto" data-id="${product.product_id}">
                    Delete
                </button>
            </div>
            <!-- Amount -->
        </div>
        <!-- start Price item-->
        <div class="col-sm-2 text-right">
            <div class="text-danger">
                <span class="product_price">${(product.product_price * product.product_amount).toFixed(2)}</span> €
            </div>
        </div>
        <!-- END Price item-->
    </div>
    `)

}