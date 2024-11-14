import { NextFunction, Request, Response } from "express";
import CreateUserDTO from "../dto/createUserDTO.dto";
import { AuthServiceImpl } from "../service/implemetation/exports";
import {LoginDTO} from "../dto/export";


const authService = new AuthServiceImpl
export class AuthController{
    
    async registration(req:Request, res:Response, next:NextFunction){
        try{
           const createUserPayLoad: CreateUserDTO = req.body;

           const user = await authService.registration(createUserPayLoad)
            res.status(201).json(user);
        }catch(error){
            next(error);
        }
    }
    async registerSeller(req:Request, res:Response, next:NextFunction){
        try{
           const createUserPayLoad: CreateUserDTO = req.body;

           const user = await authService.registerSeller(createUserPayLoad)
            res.status(201).json(user);
        }catch(error){
            next(error);
        }
    }
    async registerDriver(req:Request, res:Response, next:NextFunction){
        try{
           const createUserPayLoad: CreateUserDTO = req.body;

           const user = await authService.registerDriver(createUserPayLoad)
            res.status(201).json(user);
        }catch(error){
            next(error);
        }
    }
    async registerAdmin(req:Request, res:Response, next:NextFunction){
        try{
           const createUserPayLoad: CreateUserDTO = req.body;

           const user = await authService.registerAdmin(createUserPayLoad)
            res.status(201).json(user);
        }catch(error){
            next(error);
        }
    }

    async activateUser(req: Request, res: Response, next: NextFunction){
        try{
            const link = req.params.link;
            const activeUser = await authService.activateUser(link)
            console.log(activeUser)
            // res.redirect('http://localhost:5173/auth/success')
            res.json(activeUser)
            // console.log(activeUser)
        }catch(error){
            next(error)
        }
    }
    async login(req:Request, res:Response, next:NextFunction){
        try{
            const userLoginPayload: LoginDTO = req.body;
            const user = await authService.login(userLoginPayload)
            res.cookie("accessJWT", user.access_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24 * 7
            });
            res.cookie('refreshToken', user.refreshToken, {
                maxAge: 120 * 24 * 60 * 60 * 1000,
                secure: true,
                httpOnly: true,
                sameSite: true
            });
            res.status(200).json(user)
        }catch(error){
            next(error);
        }
    }

    async logout(req: Request, res:Response, next: NextFunction){
        try{
            const {token} = req.body;
            const user = await authService.logout(token)
            res.clearCookie("accessJWT", {
                httpOnly: true,
                secure: true,
                sameSite: true
            })
            // res.cookie('refreshToken', user.token, {maxAge: 10 * 60* 1000, httpOnly: true})
            res.status(200).json(user);
        }catch(error){
            next(error)
        }
    }

    async refreshToken(req: Request, res: Response, next: NextFunction){
        try{
            const jwt = req.cookies.refreshToken;
            const newToken = await authService.refreshToken(jwt);
            
            res.status(200).json(newToken) 
        }catch(error){
            next(error)
        }
    }
}