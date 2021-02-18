import { displayProducts, productModel } from '../index.js'

function addFunctionalityToFilterProducts (listOfProducts) {

    console.log(listOfProducts)

    const searchButton  = $('#search')

    searchButton.on('click', {'products' : listOfProducts}, filterByName )

}

function filterByName (event) {

    event.preventDefault()
    
    let name = $('#search-input').val().trim()
    let products = event.data.products

    //clearContentProducts()

    console.log(name, products)
}


function orderBy (type, order) {



}

function filterByBrand (brand) {

}

function filterByPrice (minPrice, maxPrice) {

}

function clearContentProducts () {
    $('.content-products').empty()
}

export { addFunctionalityToFilterProducts }