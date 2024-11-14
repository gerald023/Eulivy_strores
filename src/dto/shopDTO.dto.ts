

export enum ShopCategory {
    LOGISTICS,
    BOUTIQUE,
    FOODSTUFF,
    UTENSILS,
    TECH,
    DRUGS
  }

class ShopDTO{
    shopName: string
    shopCategory: any
    aboutShop: string
    userId:string
    shopImages: string[]


    constructor( shopName: string,
        shopCategory: ShopCategory,
        aboutShop: string,
        userId: string,
        shopImages: string[]){
            this.aboutShop = aboutShop
            this.shopCategory = shopCategory
            this.shopImages = shopImages
            this.shopName = shopName
            this.userId = userId
        }
}

export default ShopDTO;