import { NextFunction, Request, Response } from "express";
import {ShopServiceImpl} from "../service/implemetation/exports";
import {ShopDTO} from "../dto/export";
import { AuthorizedRequest } from "../middleware/checkAuth.utils";

const shopService = new ShopServiceImpl()
class ShopController{
   
    async createShop(req: AuthorizedRequest, res: Response, next: NextFunction){
        // const jwt = req.headers.authorization?.split(' ')[1];
        try{
            // if (!jwt) {
            //     res.status(403).json({messsage: 'not authorized'})
            //     console.log('no token')
            // }
            const images = await shopService.uploadShopImages(req.files as Express.Multer.File[])
            const payload: ShopDTO = req.body;
             const {userId} = req.params;
            // const shop = await shopService.createShop(jwt, payload)
            const shop = await shopService.createShop(new ShopDTO(payload.shopName, payload.shopCategory, payload.aboutShop, userId, images))
            res.status(201).json(shop)
        }catch(error){
            next(error)
        }
    }

    async getOneUser(req: Request, res: Response, next: NextFunction){
        try{
            const shopId = req.params.id
            const shop = await shopService.getOneShop(shopId);
            res.status(200).json(shop);
        }catch(error){
            next(error)
        }
    }

    async getAllShop(req: Request, res: Response, next: NextFunction){
        try{
            const shops = await shopService.getAllShop()
            res.status(200).json(shops)
        }catch(error){
            next(error)
        }
    }

    async deleteShop(req: Request, res: Response, next: NextFunction){
        try{
            const shopId = req.params.id
            const shop = await shopService.deleteShop(shopId);
            res.status(200).json({message: shop})
        }catch(error){
            next(error)
        }
    }
}

export default ShopController;