import { Cart, CartItem } from "@prisma/client";
import { CartItemDTO, DisplayCartItemDTO } from "../dto/export";

export interface CartService{
    createCate(userId: string): Promise<Cart>;
    addItemTCart(data: CartItemDTO): Promise<CartItem>;
    getCartById(cartId: string): Promise<DisplayCartItemDTO[]>;
    increaseItemQuatity(cartItemId: string): Promise<string>;
    decreaseItemQuatity(cartItemId: string): Promise<string>;
    removeItemFromCart(cartItemId: string): Promise<string>;
}