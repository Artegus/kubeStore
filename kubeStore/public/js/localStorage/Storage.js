class Storage {

    static saveCart (data) {
        let cart = JSON.stringify(data)

        localStorage.setItem('cart', cart)
    }

    static getCart () {
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    }

}


export { Storage }