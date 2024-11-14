import { Product } from "@prisma/client";
import { CreateProductDTO, UpdateProductDTO } from "../../dto/export";
import { ProductService } from "../exports";
import { CloudnaryServiceImpl } from "./cloudinaryServiceImpl.impl";
import { db } from "../../utils/db.utils";
import { CustomError } from "../../error/customError.error";
 
const cloudinaryService = new CloudnaryServiceImpl()

class ProductServiceImpl implements ProductService{
   
    async createProduct(data: CreateProductDTO): Promise<Product> {
        const shop = await db.shop.findFirst({
            where:{
                id: data.shopID
            }
        })
        if (!shop) {
            throw new CustomError(404, 'shop does not exists!');
        }
        const price = Number(data.price)
        const images = await this.uploadProductImages(data.images)
        const product = await db.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: price,
                shopID: data.shopID,
                images: images,
                cartId: ''
            }
        });
        return product;
    }
    async getShopPrducts(shopId: string): Promise<Product[]> {
        const products = await db.product.findMany({
            where: {
                shopID: shopId
            }
        });
        return products;
    }
    async getOneProduct(productId: string): Promise<Product> {
        const product = await db.product.findFirst({
            where:{
                id: productId
            }
        });
        if (!product) {
            throw new CustomError(404, 'product not found')
        }
        return product;
    }
    async updateProduct(data: UpdateProductDTO): Promise<Product> {
       
        const product = await db.product.findFirst({
            where: {
                id: data.productId
            }
        });
        if (!product) {
            throw new CustomError(404, 'product not found! (-_-)!')
        }

        const images = await this.uploadProductImages(data.images)
        const price = Number(data.price)
        const updateProduct = await db.product.update({
            where:{
                id: data.productId
            },
            data:{
                name: data.name || product.name,
                description: data.description || product.description,
                price: price || product.price,
                status: data.status || product.status,
                images: images || product.images
            }
        });
        return updateProduct;
    }

    async updateProductStatus(id: string): Promise<string> {
        const product = await db.product.findFirst({
            where:{id}
        })

        const updateProduct = await db.product.update({
            where: {id},
            data: {
                status: product?.status === 'AVAILABLE' ? 'OUT_OF_STOCK' : 'AVAILABLE'
            }
        });
        if(!updateProduct){
            throw new CustomError(400, 'status not changed');
        }
        return `product status updated from ${product?.status} to ${updateProduct.status}`
    }
    


    async uploadProductImages(files: Express.Multer.File[]) {
        const uploadResults = await cloudinaryService.uploadMultiple(files);
        return uploadResults.map((result: any) => result.secure_url); 
      }
}


export default ProductServiceImpl;