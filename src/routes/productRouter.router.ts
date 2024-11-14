import { Router } from "express";
import { ProductController } from "../controller/exports";
import { validationMiddleware } from "../middleware/validationMiddleware.middleware";
import { CreateProductDTO, UpdateProductDTO } from "../dto/export";
import { CheckRole, CheckAuth } from "../middleware/exports";
import upload from "../middleware/multerConfig.config";


const productRouter = Router()
const productController = new ProductController()

productRouter.post('/create-product/:shopId', CheckRole('SELLER'), CheckAuth, upload.array('images', 10), validationMiddleware(CreateProductDTO), productController.createProduct);

productRouter.get('/shop/:shopId', productController.getShopProduct);

productRouter.get('/:productId', productController.getOneProduct);

productRouter.patch('/:productId/update', CheckRole('SELLER'), CheckAuth, upload.array('images', 10), validationMiddleware(UpdateProductDTO), productController.updateProduct);

productRouter.patch('/:productId/update-status', CheckRole('SELLER'), CheckAuth, productController.updateProductStatus);

export default productRouter;