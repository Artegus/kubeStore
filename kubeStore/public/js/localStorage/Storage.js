class Storage {

    static saveCart (data) {
        let cart = JSON.stringify(data)

        localStorage.setItem('cart', cart)
    }

    static getCart () {
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    }

    static removeCart() {
        if (localStorage.getItem('cart')) {
            localStorage.removeItem('cart')
        }
    }

    static defaultCartItem (id, amount, product) {
        return {
            'product_id' : id,
            'product_amount' : amount,
            'product_price' : product.product_price,
            'product_name' : product.product_name,
            'product_brand' : product.product_brand,
            'product_image' : product.product_image
        }
    }

    
}


export { Storage }