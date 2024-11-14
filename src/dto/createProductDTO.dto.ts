import { ProductStatus } from "@prisma/client";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";



export class CreateProductDTO{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    @IsEnum(ProductStatus)
    status: ProductStatus;

    @IsNotEmpty()
    price:string

    @IsString()
    @IsNotEmpty()
    description: string

    images: Express.Multer.File[]

    shopID: string


    constructor(name: string, status: ProductStatus, price:string, description: string ,images:  Express.Multer.File[], shopID: string){
        this.name = name
        this.status = status
        this.price = price
        this.description = description
        this.images = images
        this.shopID = shopID
    }
}