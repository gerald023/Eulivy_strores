import { Product } from "@prisma/client";
import { CreateProductDTO, UpdateProductDTO } from "../dto/export";

export interface ProductService{
    createProduct(data: CreateProductDTO): Promise<Product>;
    getShopPrducts(shopId: string): Promise<Product[]>;
    getOneProduct(productId: string): Promise<Product>;
    updateProduct(data: UpdateProductDTO) : Promise<Product>
    updateProductStatus(productId: string): Promise<string>;
}