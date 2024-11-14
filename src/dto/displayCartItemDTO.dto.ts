export class DisplayCartItemDTO{
    productName: string
    productImages: string[]
    quantity: number
    price: number
    store: string


    constructor(productName: string, productImages: string[], quantity: number, price: number, store: string){
        this.productName = productName
        this.productImages = productImages
        this.quantity = quantity
        this.price = price
        this.store = store
    }
}