import cloudinaryUtils from "../utils/cloudinary.utils";
import { CreateProfileDTO, UpdateProfileDTO, UpdateUserDTO } from '../dto/export';
import { UserServiceImpl } from "../service/implemetation/exports"; 
import {Response, Request, NextFunction} from 'express';
import { CheckAuth } from "../middleware/exports";


 
const userService = new UserServiceImpl();

class UserController{

    async getOneUser(req:Request, res:Response, next:NextFunction){
        try{
            const id = req.params.id;
            const user = await userService.getOneUser(id);
            res.status(200).json(user)
        }catch(error){
            next(error);
        }
    }

    async getAllUsers(req:Request, res:Response, next:NextFunction){
        try{
            const allUsers = await userService.getAllUsers();
            res.status(200).json(allUsers);
        }catch(error){
            next(error);
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction){
        try{
            const jwtID = CheckAuth
            console.log(jwtID)
            const userId : string = req.params.userId;
            const Payload : UpdateUserDTO = req.body;
            const data = new UpdateUserDTO(userId, Payload.email, Payload.firstName, Payload.lastName)
            const user = await userService.updateUser(data)

            res.status(200).json(user)
        }catch(error){
            next(error)
        }
    }

    async getUserIdFromToken(req: Request, res:Response, next: NextFunction){
        try{
            const jwt: string = req.body.jwt
            const useId = await userService.getUserIdFromToken(jwt)
            res.status(200).json({useId})
        }catch(error){
            next(error)
        }
    }
    async createUserProfile(req: Request, res: Response, next: NextFunction){
        try{
            
            // const profilePayload: CreateProfileDTO = req.body;
            // const image = await userService.uploadProfileImage(req.files as unknown as Express.Multer.File)
            const id = await userService.getUserIdFromToken(req.cookies.accessJWT)
            const userId :any  = req.params.userId || id
            const {username, bio, } = req.body;  
            const file = req.file;
            if (!file) {  
                res.status(400).send("image file is required");
            }
            const data = new CreateProfileDTO(username, bio, file!, userId)
            console.log(req.body)
            const user = await userService.createUserProfile(data)
             res.status(201).json(user);
        }catch(error){
            next(error)
        }
    }

    async getUserProfile(req: Request, res: Response, next: NextFunction){
        try{
            const userId = req.params.userId;
            const profile = await userService.getUserProfile(userId);
            res.status(200).json(profile)
        }catch(error){
            next(error)
        }
    }
    async getAllProfile(req: Request, res: Response, next: NextFunction){
        try{
            const allProfile = await userService.getAllProfile()
            res.status(200).json(allProfile)
        }catch(error){
            next(error)
        }
    }

    async updateProfile(req: Request, res: Response, next: NextFunction){
        try{
            const id: string = (await userService.getUserIdFromToken(req.cookies.accessJWT)).toString()
            const userId: string = id;
            const file = req.file;
            const Payload : UpdateProfileDTO = req.body;
            const data = new UpdateProfileDTO(Payload.bio, Payload.username, userId, file!)
            const updateProfile = await userService.updateProfile(data);
            res.status(200).json(updateProfile)
        }catch(error){
            next(error)
        }
    }
}

export default UserController;