import { NextFunction, Request, Response } from "express";
import { ProductServiceImpl } from "../service/implemetation/exports";
import { CreateProductDTO, UpdateProductDTO } from "../dto/export";

const ProductService = new ProductServiceImpl()
export class ProductController{
    async createProduct(req: Request, res: Response, next: NextFunction){
        try{
            const shopId = req.params.shopId
            const images = req.files as Express.Multer.File[]
            const payload: CreateProductDTO = req.body;
            const data = new CreateProductDTO(payload.name, payload.status, payload.price, payload.description, images, shopId)

            const product = await ProductService.createProduct(data);
            res.status(201).json(product);
        }catch(error){
            next(error)
        }
    };
    async getShopProduct(req: Request, res: Response, next: NextFunction){
        try{
            const shopId = req.params.shopId;
            const products = await ProductService.getShopPrducts(shopId);
            res.status(200).json(products)
        }catch(error){
            next(error)
        }
    };

    async getOneProduct(req: Request, res: Response, next: NextFunction){
        try{
            const productId = req.params.productId
            const product = await ProductService.getOneProduct(productId);
            res.status(200).json(product);
        }catch(error){
            next(error);
        }
    };

    async updateProduct(req: Request, res: Response, next: NextFunction){
        try{
            const productId = req.params.productId;
            const images = req.files as Express.Multer.File[];
            const payload: UpdateProductDTO = req.body;
            const data = new UpdateProductDTO(productId, payload.name, payload.status, payload.price, payload.description, images);

            const product = await ProductService.updateProduct(data);

            res.status(200).json(product);
        }catch(error){
            next(error)
        }
    };

    async updateProductStatus(req: Request, res: Response, next: NextFunction){
        try{
            const productId = req.params.productId
            const status = await ProductService.updateProductStatus(productId);

            res.status(200).json({message: status});

        }catch(error){
            next(error)
        }
    };
}