import { NextFunction, Request, Response } from "express";
import { AuthConfig } from "../config/authConfig.config";

const authConfig = new AuthConfig()

export interface AuthorizedRequest extends Request{
	userId?: number
}
export  const CheckAuth = async (req: AuthorizedRequest , res: Response, next: NextFunction) =>{
    const token = req.cookies.accessJWT || req.headers.authorization?.split(' ')[1];
	if (!token) {
		 res.status(401).json({ message: 'No token provided, authorization denied' });
	  }
	if (token) {
		try {
			const decoded = await authConfig.validateAccessToken(token)
			req.userId = decoded.userId;
			console.log('userID: ' +  req.userId)
			next()
			return decoded.userId
		} catch (error) {
			 res.status(401).json({
				message: 'Auth failed',
			})
		}
	}
}