import { Storage } from '../localStorage/Storage.js'
import { showCartItems } from '../carrito.js'

function makePurchase (event) {

    const user_id = event.data.user_id
    var listOfProducts = event.data.products
    var totalPrice =  listOfProducts.reduce( ( sum, { product_amount, product_price } ) => sum + (product_amount * product_price) , 0).toFixed(2)

    listOfProducts = listOfProducts.map((product) => {
        return {
            'product_id' : product.product_id,
            'product_amount' : product.product_amount,
            'product_name' : product.product_name,
            'product_price' : product.product_price
        }
    })

    $.post('php/database/user/makePurchase.php', {'user_id' : user_id, 'listOfProducts' : listOfProducts, 'totalPrice' : totalPrice}, showStatusOfPurchase, 'json')

}


function showStatusOfPurchase (response) {
    console.log(response)
    var {status : { errors }} = response

    if (errors.length == 0) {
        
        Storage.removeCart()
        
        showCartItems()

        displayAdviseOfPurchase(response)

    } else {
        Storage.removeCart() 
        showCartItems()
        displayAdviseOfPurchase(response)
    }

    // TODO:
    // Si la compra se realiza correctamente entonces limpiar los productos del carrito
    // Storage.removeCart()
    // Avisar de compra realizada correctamente
    // showCartItems()
    // Si ocurre algún fallo en la venta mostrar los fallos.


}

function displayAdviseOfPurchase (purchaseInformation) {

    var {status : { errors, success }, purchase : { products, totalPrice }} = purchaseInformation

    var errorsHTML = errors.map(error => errorListHTML(error))
    var successProducts = products.map((product => {
        if (success.includes(product.product_name)) {
            return product
        }
    }))
    var successProductsHTML = successProducts.map(success => successListHTML(success))

    $(`
        <div id='purchase-advise'>
            ${errors.length > 0 ? 
            `<h4>Error in your purchase</h4>
            <ul>
                ${errorsHTML.join(' ')}
            </ul>` : ''}
            ${success.length > 0 ? 
            `<h4>Total purchase</h4>
            <ul>
                ${successProductsHTML.join(' ')}
            </ul>
            <p>Total : ${totalPrice}</p>
            ` : ''}
            <div>
                <button class="btn btn-primary close-advise">Close advise</button>
            </div>
        </div>
    `).appendTo('#main')

    $('.close-advise').on('click', {}, () => {
        $('#purchase-advise').remove()
    })

}

function errorListHTML (productError) {
    return `<li>Out of stock - ${productError}</li>`
}
function successListHTML (productSuccess) {
    return `<li>${productSuccess.product_name} <p>Amount: ${productSuccess.product_amount} </p> <p>Price: ${(productSuccess.product_amount * productSuccess.product_price).toFixed(2)}</p></li>`
}



export { makePurchase }