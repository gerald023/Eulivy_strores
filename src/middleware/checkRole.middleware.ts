import { NextFunction, Request, Response } from "express"
import { AuthConfig } from "../config/authConfig.config";


const authConfig = new AuthConfig()

export const CheckRole = (...userRole: string[])=>{
    return (req: Request, res: Response, next: NextFunction)=>{
        const token = req.cookies.accessJWT || req.headers.authorization?.split(' ')[1];
        if (!token) {
             res.status(401).json({ message: 'No token provided, authorization denied' });
          }
          const user = authConfig.validateAccessToken(token!)
          if (!user.isActivated ) {
                res.status(401).json({message: "user's account has not been activated yet"})
            } 
        try{
            console.log('is user activated: ' + user.isActivated)
            if (!userRole.includes(user.role)) {
                res.status(401).json({message: `user with role ${user.role} can't access this route. Authorization denied`})
            }
            else next();
            
           
        }catch(error){
           return next(error)
        }
    }
}