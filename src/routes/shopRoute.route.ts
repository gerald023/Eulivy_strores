import { Router } from "express";
import { validationMiddleware } from "../middleware/validationMiddleware.middleware";
import {ShopDTO} from "../dto/export";
import {ShopController} from "../controller/exports";
import { CheckAuth, CheckRole } from "../middleware/exports";
import upload from "../middleware/multerConfig.config";




const shopController = new ShopController()
const shopRouter =  Router()
 

shopRouter.post('/:userId/create-shop', CheckAuth, CheckRole('SELLER'),upload.array('images', 10), validationMiddleware(ShopDTO), shopController.createShop)
shopRouter.get('/:id', CheckAuth, shopController.getOneUser)
shopRouter.get('/', shopController.getAllShop)
shopRouter.delete(':id', shopController.deleteShop)


export default shopRouter;