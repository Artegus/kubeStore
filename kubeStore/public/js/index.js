import { logOut } from './utils/logOut.js'
import { openUserSettings } from './utils/settingsUser.js'
import { addFunctionalityToFilterProducts } from './utils/filterProducts.js'
import { Storage } from './localStorage/Storage.js'

// Global variable
var listOfProducts = [];
var listOfProductsHTML = [];
// Initial cart
var listOfProductsCart = $('.btn-cart').length > 0 ?  Storage.getCart() : 'No user'

window.onload = (function () {
    
    getAllProducts();

    var buttonLogOut = $('.btn-logout')
    var buttonUserSettings = $('.btn-user')

    buttonLogOut.on('click', {}, logOut)

    buttonUserSettings.on('click', {'user_id' : buttonUserSettings.data('id')}, openUserSettings)

    // TODO:
    // Si el producto se encuentra en el carrito (localStorage) entonces hacer que el boton de ese producto este deshabilitado
    // Además el botón debe poner in cart

})


function getAllProducts () {

    $.getJSON('php/database/products/getProducts.php', {'products' : 'ok'}, saveProducts);

}

function saveProducts ([products, brands]) {

    chargeBrandsOnSelect(brands)

    addFunctionalityToFilterProducts(products);
    
    listOfProducts = products;

    if (products.length > 0) {
        displayProducts(listOfProducts)        
    } else {
        $('<h1 class="products-empty" >At the moment we are out of stock. We are sorry.</h1>').appendTo('.products')
    }


}

function chargeBrandsOnSelect (brands) {

    /* 
    // Si surge algún problema al pedir marcas de la base de datos. Filtra las marcas por el objeto de producto.
    let uniq = a => [...new Set(a)];
    // Gets all the brands and they are not repeated
    let allProductsBrands = uniq(products.map((products) => products.product_brand))
    console.log(allProductsBrands)  */

    brands.forEach(({brand_name}) => {
        $('#select-fabricante').append(`<option value='${brand_name}'>${brand_name}</option>`)
    })


}

function clearContentProducts () {
    $('.content-products').empty()
}

export function displayProducts (listOfProducts) {
    
    clearContentProducts()

    listOfProductsHTML = listOfProducts.map((product) => productModel(product))

    listOfProductsHTML.forEach((productHTML) => productHTML.appendTo('.content-products') )

    if (listOfProductsCart != 'No user') { // Solo se puede añadir al carrito si esta logueado
        $('.product-card a:contains("Add to cart")').on('click', {}, addToCart)
    } else { // Si se intenta usar el botón se muestra un aviso
        $('.product-card a:contains("Add to cart")').on('click', {}, () => {
            alert('You must log in to add your purchase to the cart')
        })
    }
    // Cada vez que se muestren los productos actualizar los que ya se encuentren en el carrito
    updateProducts()

}

function addToCart (event) {

    event.preventDefault()
    let target = event.target

    let productId = $(target).data('id') ? $(target).data('id') : $(target).parent().data('id')

    let productObject = getProductById(productId)

    let productItem = Storage.defaultCartItem(productId, 1, productObject)

    var productsOnCart = Storage.getCart()
    productsOnCart = [...productsOnCart, productItem]
    // Guardar item
    Storage.saveCart(productsOnCart)
    // Actualizar items 
    // Bloquear item
    // Actualizar número de elementos en el carrito
    updateCounterCart();
    blockProduct(productId)
}

function getProductById (id = '') {
    return listOfProducts.find(({product_id}) => product_id == id)
}


function updateProducts () {

    updateCounterCart()

    var productsButtons = $('.product-card a:contains("Add to cart")').toArray()
    var productsInCart = Storage.getCart()
    // Funciona
    /* productsInCart.forEach((item) => {
        productsButtons.forEach( button => {
            let idButton = $(button).data('id')

            if (idButton == item.product_id) {
                $(button).css({
                    'backgroundColor' : 'grey',
                    'cursor' : 'no-drop',
                    'border-color' : 'grey'
                }).text('In Cart').off()
            }
        })
    }) */

    // Otra manera

    productsInCart.forEach(({product_id}) => {
        blockProduct(product_id)
    })

}

export function blockProduct (id) {
    
    var productsButtons = $('.product-card a:contains("Add to cart")').toArray()

    var productButton = productsButtons.find( product => $(product).data('id') == id)

    $(productButton).css({
        'backgroundColor' : 'grey',
        'cursor' : 'no-drop',
        'border-color' : 'grey'
    }).text('In Cart').off()

}

export function updateCounterCart () {
    var cart = Storage.getCart()
    var amountOfItems = cart.length

    $(`.btn-cart span`).remove()
    $(`<span>${amountOfItems}</span>`).appendTo('.btn-cart')
}


export function productModel (product) {

    return $(`
    <div class="col product-card" data-id='${product.product_id}'>
        <div class="card text-dark bg-light">
            <img src="./images/${product.product_image}" class="card-img-top image-default" alt="image of ${product.product_name}">
            <div class="card-body">
                <h5 class="card-title item-title">${product.product_name}</h5>
                <p class="card-text item-brand">Brand: ${product.product_brand}</p>
                <p class="card-text item-price">Price: ${product.product_price}€</p>
                <a class="btn me-2 btn-primary" data-id='${product.product_id}'>+ info</a>
                <a class="btn me-2 btn-warning" data-id='${product.product_id}'>Add to cart <i class="fas fa-shopping-cart"></i></a>
            </div>
        </div>
    </div>
    `)

}