import { ProductStatus } from "@prisma/client";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";


export class UpdateProductDTO{
    productId!: string

    name!: string

   
    status!: ProductStatus;


    price!: string

   
    description!: string

    images!: Express.Multer.File[]

    


    constructor(productId: string, name: string, status: ProductStatus, price: string, description: string, images: Express.Multer.File[]){
        this.productId = productId
        this.name = name
        this.status = status
        this.price = price
        this.description = description
        this.images = images
    }
}