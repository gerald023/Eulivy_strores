import { Prisma, Shop } from "@prisma/client";
import {ShopService} from "../exports";
import { db } from "../../utils/db.utils";
import { CustomError } from "../../error/customError.error";
import {ShopDTO, UpdateShopDTO} from "../../dto/export";
import CloudnaryServiceImpl from "./cloudinaryServiceImpl.impl";


const cloudinaryService = new CloudnaryServiceImpl()


class ShopServiceImpl implements ShopService{
    
    async createShop( data: ShopDTO): Promise<Shop> {
       
          const ShopExists = await db.shop.findFirst({
            where:{
                OR: [
                    {shopName: data.shopName},
                    {userID: data.userId}
                ]
            }, 
          });
          if (ShopExists) {
            throw new CustomError(403, "shop name already exists or user has a shop")
          }

        const shop = await db.shop.create({ 
            data:{
                shopName: data.shopName,
                shopCategory: data.shopCategory,
                aboutShop: data.aboutShop,
                // userID: data.user,
                user: {
                    connect: {
                        id: data.userId
                    }
                },
                shopImage: data.shopImages
            }
        })
        return shop;
    }
    async getOneShop(id: string): Promise<Shop> {
        const shop = await db.shop.findFirst({
            where:{ id },
             include:{
                products: true
             }
        });
        if (!shop) {
            throw new CustomError(404, "shop not found")
        }
        return shop;
    }
    async getAllShop(): Promise<Shop[]>{
        return await db.shop.findMany()
    }
    async deleteShop(id: string): Promise<string> {
        const deletedShop = await db.shop.delete({
            where:{ id }
        })
        if (!deletedShop) {
            throw new CustomError(404, "shop does not exists")
        }

        return `${deletedShop.shopName} has been deleted`;
    }

    async updateShop(data: UpdateShopDTO): Promise<Shop> {
        const shop = await db.shop.findFirst({
            where:{ 
                id: data.shopId
             }
        });
        if(!shop){
            throw new CustomError(404, 'Shop not found')
        }
        const updatedShop = await db.shop.update({
            where: {
                id: data.shopId
            },
            data:{
                aboutShop: data.aboutShop || shop.aboutShop,
                shopImage: data.shopImages || shop.shopImage,
            }
        })
        return updatedShop;

    }

    async uploadShopImages(files: Express.Multer.File[]) {
        const uploadResults = await cloudinaryService.uploadMultiple(files);
        return uploadResults.map((result: any) => result.secure_url); 
      }

}


export default ShopServiceImpl;