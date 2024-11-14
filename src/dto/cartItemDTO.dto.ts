export class CartItemDTO{
    cartId: string
    productId: string
    quantity: number


    constructor(cartId: string, productId: string, quantity: number){
        this.cartId = cartId
        this.productId = productId
        this.quantity = quantity
    }
}

