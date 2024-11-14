import { ShopCategory } from "./shopDTO.dto"

export class UpdateShopDTO{
    shopName: string
    shopCategory: any
    aboutShop: string
    shopId:string
    shopImages: string[]


    constructor( shopName: string,
        shopCategory: ShopCategory,
        aboutShop: string,
        shopId: string,
        shopImages: string[]){
            this.aboutShop = aboutShop
            this.shopCategory = shopCategory
            this.shopImages = shopImages
            this.shopName = shopName
            this.shopId = shopId
        }
}