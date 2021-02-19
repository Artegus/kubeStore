import { displayProducts, productModel } from '../index.js'

function addFunctionalityToFilterProducts (listOfProducts) {

    const searchInput  = $('#search-input')
    const orderbyButton = $('#orderBy')
    const brandSelect = $('#select-fabricante')
    const resetButton = $('#reset')

    searchInput.on('keyup', {'products' : listOfProducts}, filterByName)
    orderbyButton.on('change', {'products' : listOfProducts}, orderBy)
    brandSelect.on('change', {'products' : listOfProducts}, filterByBrand)
    resetButton.on('click', {'products' : listOfProducts}, showAllProducts)
}

function filterByName (event) {

    //event.preventDefault()
    
    let nameLowered = $('#search-input').val().trim().toLocaleLowerCase()
    let products = event.data.products

    if (nameLowered.length > 0) {
        let listOfFilteredProducts = products.filter(({product_name}) => product_name.toLocaleLowerCase().includes(nameLowered))
        
        displayProducts(listOfFilteredProducts)
    } else {
        displayProducts(products)
    }
}


function orderBy (event) {

    let valueOfSelect = event.target.value
    let [type, order] = getTypeAndOrder(valueOfSelect)
    let products = event.data.products

    if (valueOfSelect.length > 0) {
        let actualProducts = getProductsDisplayed(products);
        // Obtener los productos que están actualmente en la pantalla
        let listOfFilteredProducts

        if (type == 'price') {
            listOfFilteredProducts = actualProducts.sort(({product_price : priceA}, {product_price : priceB}) => {
                if (order == 'asc') {
                    return priceA - priceB
                } else {
                    return priceB - priceA
                }
            })
        } else {
            listOfFilteredProducts = actualProducts.sort(({product_name : nameA}, {product_name : nameB}) => {
                if (order == 'asc') {
                    return nameA.localeCompare(nameB)
                } else {
                    return nameB.localeCompare(nameA)
                }
            })
        }

        displayProducts(listOfFilteredProducts)
    }

}

function getProductsDisplayed (defaultProducts) {

    let productsHTML = $('.product-card').toArray()

    let productsId = productsHTML.map((product) => $(product).data('id'))

    let actualProducts = defaultProducts.filter(({product_id}) => productsId.includes(product_id))

    return actualProducts
}

function getTypeAndOrder (valueSelect) {
    let type = valueSelect.includes('price') ? 'price' : 'name'
    let order = valueSelect.includes('Ascendent') ? 'asc' : 'des'
    return [type, order]
}


function filterByBrand (event) {

    let brandSelected = event.target.value
    let products = event.data.products

    if (brandSelected.length > 0) {
        // Only filter visible products
        //let actualProducts = getProductsDisplayed(products);

        let listOfFilteredProducts = products.filter(({product_brand}) => product_brand == brandSelected)

        displayProducts(listOfFilteredProducts);

    }

}

function showAllProducts (event) {
    let products = event.data.products

    displayProducts(products)

}
export { addFunctionalityToFilterProducts }