import { Router } from "express";
import { CartController } from "../controller/exports";
import { CheckAuth, CheckRole } from "../middleware/exports";
import { validationMiddleware } from "../middleware/validationMiddleware.middleware";
import { CartItemDTO } from "../dto/export";


const cartRouter =  Router()
const cartController = new CartController()

cartRouter.post('/create-cart', CheckAuth, CheckRole('SELLER'), cartController.createCart);
cartRouter.post('/add-item', CheckAuth, CheckRole('SELLER'), validationMiddleware(CartItemDTO), cartController.addItemToCart);
cartRouter.get('/:cartId', cartController.getCartById);
cartRouter.patch('/increase-qty/:cartItemId', cartController.increaseCartItemQty);
cartRouter.patch('/decrease-qty/:cartItemId', cartController.decreaseCartItemQty);
cartRouter.delete('/delete-item/:cartItemId', cartController.removeItemFromCart);


export default cartRouter;