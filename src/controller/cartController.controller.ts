import { NextFunction, Request, Response } from "express";
import { CartServiceImpl } from "../service/implemetation/exports";
import { CartItemDTO } from "../dto/export";

const cartService = new CartServiceImpl()

export class CartController{
    async createCart(req: Request, res: Response, next: NextFunction){
        try{
            const userId: string = req.body;
            const cart = await cartService.createCate(userId)
            res.status(201).json(cart);
        }catch(error){
            next(error)
        }
    };

    async addItemToCart(req: Request, res: Response, next: NextFunction){
        try{
            const payload : CartItemDTO = req.body;
            const cart = await cartService.addItemTCart(payload);
            res.status(200).json(cart);
        }catch(error){
            next(error)
        }
    };

    async getCartById(req: Request, res: Response, next: NextFunction){
        try{
            const cartId = req.params.cartId
            const cart = await cartService.getCartById(cartId);
            res.status(200).json(cart);
        }catch(error){
            next(error)
        }
    };

    async increaseCartItemQty(req: Request, res: Response, next: NextFunction){
        try{
            const cartItemId = req.params.cartItemId
            const response = await cartService.increaseItemQuatity(cartItemId);
            res.status(200).json({message: response});
        }catch(error){
            next(error)
        }
    };

    async decreaseCartItemQty(req: Request, res: Response, next: NextFunction){
        try{
            const cartItemId = req.params.cartItemId
            const response = await cartService.decreaseItemQuatity(cartItemId);
            res.status(200).json({message: response});
        }catch(error){
            next(error)
        }
    };

    async removeItemFromCart(req: Request, res: Response, next: NextFunction){
        try{
            const cartItemId = req.params.cartItemId
            const response = await cartService.removeItemFromCart(cartItemId);
            res.status(200).json({message: response});
        }catch(error){
            next(error)
        }
    };

}