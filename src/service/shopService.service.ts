import { Shop } from "@prisma/client";
import {ShopDTO, UpdateShopDTO} from "../dto/export";


interface ShopService{
    createShop( data: ShopDTO) : Promise<Shop>
    getOneShop(id: string): Promise<Shop>
    getAllShop(): Promise<Shop[]>
    deleteShop(id: string): Promise<string>
    updateShop(data: UpdateShopDTO): Promise<Shop>
}
export default ShopService;