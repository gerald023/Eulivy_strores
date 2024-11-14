import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv';
import { UserDTO } from "../dto/export";
import { db } from "../utils/db.utils";
import { CustomError } from "../error/customError.error";

dotenv.config();
const ACCESS_TOKEN_SECRET_KEY:any = process.env.ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY:any = process.env.REFRESH_TOKEN_SECRET_KEY;

export class AuthConfig{
    
   async generateToken(user: any): Promise<{ access_token: string; refreshToken: string; }> {
        const access_token = jwt.sign({userId: user.id, email: user.email, isActivated: user.isActivated, role: user.role}, ACCESS_TOKEN_SECRET_KEY, {expiresIn: "10d"});
        const refreshToken = jwt.sign({userId: user.id, email: user.email, isActivated: user.isActivated, role: user.role}, REFRESH_TOKEN_SECRET_KEY, {expiresIn: "120d"})
    return {
      access_token,
      refreshToken
    };
    }

    async saveToken(userId: string, refreshToken: string){
        const tokenInDb = await db.refreshTokens.findUnique({
          where: {
            userId
          }
        });
        if (tokenInDb) {
          const updatedToken = await db.refreshTokens.update({
            where: {
              userId
            },
            data:{
              token: refreshToken
            }
          })
          console.log(updatedToken)
          // tokenInDb.token = refreshToken;
        }
        else{
          const saveToken = await db.refreshTokens.create({
            data:{
              userId,
              token: refreshToken
            }
          });
          if (!saveToken) {
            throw new CustomError(404, 'token not saved')
          }
        }
    }

    validateAccessToken(token: string): any{
        try {
            const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);
            return decoded;
          } catch (error) {
            console.log('Token verification failed:', error);
            return null;
          }
    }  

    async validateRefreshToken(token: string): Promise<any>{
      try {
        await this.findToken(token)
          const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET_KEY);
          
          return decoded;
        } catch (error) {
          console.log('Token verification failed:', error);
          return null;
        }
  }

  async removeToken(token: string){
    return await db.refreshTokens.delete({
      where:{
        token
      }
    });
  }

  async findToken(token: string){
    return await db.refreshTokens.findFirst({
      where: {token}
    })
  }
}