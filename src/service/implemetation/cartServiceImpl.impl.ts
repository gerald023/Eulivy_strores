import { Cart, CartItem } from "@prisma/client";
import { CartItemDTO, DisplayCartItemDTO } from "../../dto/export";
import { CartService } from "../exports";
import { db } from "../../utils/db.utils";
import { CustomError } from "../../error/customError.error";
import { ShopServiceImpl } from "./exports";
import ProductServiceImpl from "./productServiceImpl.impl";

const productService = new ProductServiceImpl()
const shopService = new ShopServiceImpl()

export class CartServiceImpl implements CartService{
    async createCate(userId: string): Promise<Cart> {
        const isCartExist = await db.cart.findFirst({
            where:{
                userId
            }
        })

        if (isCartExist) {
            throw new CustomError(400, 'user has a cart');
        }
        const cart = await db.cart.create({
            data:{
                userId
            }
        });

        return cart;
    }
    async addItemTCart(data: CartItemDTO): Promise<CartItem> {
        // const isCartItem = await db.cartItem.findFirst({
        //     where:{
        //         cartId: data.cartId
        //     }
        // })
        const cartItem = await db.cartItem.create({
            data
        })
        return cartItem;
    }
    async getCartById(cartId: string): Promise<DisplayCartItemDTO[]> {
        const cart = await db.cart.findFirst({
            where:{
                id: cartId
            },
            include: {
                CartItems: true
            }
        });
        
        if (!cart) {
            throw new CustomError(404, 'no cart found');
        }
        const data =  await Promise.all(
            cart.CartItems.map( async(cartItem) =>{
                const product = await productService.getOneProduct(cartItem.productId);
                const shop = await shopService.getOneShop(product.shopID);
                return new DisplayCartItemDTO(product.name, product.images, cartItem.quantity, cartItem.quantity * product.price, shop.shopName);
            })
        )
        return data;
    }
    async increaseItemQuatity(cartItemId: string): Promise<string> {
        const cartItem = await db.cartItem.findFirst({
            where:{
                id: cartItemId
            }
        });
        if (!cartItem) {
            throw new CustomError(404, 'cart item not found');
        }
        const increaseQuantity = await db.cartItem.update({
            where:{
                id: cartItemId
            },
            data:{
                quantity: cartItem.quantity++
            }
        });
        return `quantity increase to ${increaseQuantity.quantity}`
    }
    async decreaseItemQuatity(cartItemId: string): Promise<string> {
        const cartItem = await db.cartItem.findFirst({
            where:{
                id: cartItemId
            }
        });
        if (!cartItem) {
            throw new CustomError(404, 'cart item not found');
        }
        const decreaseQty = await db.cartItem.update({
            where:{
                id: cartItemId
            },
            data:{
                quantity: cartItem.quantity++
            }
        });
        return `quantity increase to ${decreaseQty.quantity}`
    }
    async removeItemFromCart(cartItemId: string): Promise<string> {
        const cartItem = await db.cartItem.delete({
            where:{
                id: cartItemId
            }
        });
        if (!cartItem) {
            throw new CustomError(404, 'item does not exists');
        }
        return `${cartItem.productId} has been deleted`;
    }

}