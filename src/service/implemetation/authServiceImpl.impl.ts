import CreateUserDTO from "../../dto/createUserDTO.dto";
import {UserDTO} from "../../dto/export";
import LoginDTO from "../../dto/loginDTO.dto";
import { AuthService } from "../exports";
import { db } from "../../utils/db.utils";
import { CustomError } from "../../error/customError.error"; 
import bcrypt from 'bcryptjs';
import { AuthConfig } from "../../config/authConfig.config";
import {v4 as uuidV4} from 'uuid';
import { ActivationLinkDTO } from '../../dto/export';
import {  } from "./exports";
import { CartServiceImpl } from "./cartServiceImpl.impl";
import { MailServiceImpl } from './mailServiceImpl.impl'



const authConfig = new AuthConfig()
const mailService = new MailServiceImpl()
const cartService = new CartServiceImpl()

export class AuthServiceImpl implements AuthService{
   
    async registration(data: CreateUserDTO): Promise<{}> {
        const isUserAlreadyExists = await db.user.findUnique({
            where:{
                email: data.email
            },
            
           });
           if (isUserAlreadyExists) {
            throw new CustomError(409, "email already exists");
           }
           
           const hashPassword = await bcrypt.hash(data.password, 10)
           const activationLink = uuidV4()
           const emailLink = 'http://localhost:5173/?token=' +activationLink;
           const emailData = new ActivationLinkDTO(data.email, emailLink, data.firstName)
           const mail = await mailService.sendActivationLink( emailData )
           console.log('mail sent: '  + mail)
           if (!mail) {
            throw new CustomError(409, 'problem while sending email')
           }
           const user =  await db.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashPassword,
                role: 'BUYER',
                activationLink: activationLink,
                isActivated: false
            }
           });
           const userCart = await cartService.createCate(user.id);
           console.log('is cart created: ' + userCart) 
          
           const userDto = new UserDTO(
            user.email, user.isActivated, user.id, data.role 
        );
           const token = authConfig.generateToken(userDto);
           return {userDto, token};
    }

    async registerSeller(data: CreateUserDTO): Promise<{}> {
         const isUserAlreadyExists = await db.user.findUnique({
            where:{
                email: data.email
            },
            
           });
           if (isUserAlreadyExists) {
            throw new CustomError(409, "email already exists");
           }
           
           const hashPassword = await bcrypt.hash(data.password, 10)
           const activationLink = uuidV4()
           const emailLink = 'http://localhost:5173/?token=' +activationLink;
           const emailData = new ActivationLinkDTO(data.email, emailLink, data.firstName)
           const mail = await mailService.sendActivationLink( emailData )

           console.log('mail sent: '  + mail)
           if (!mail) {
            throw new CustomError(409, 'problem while sending email')
           }
           const user =  await db.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashPassword,
                role: 'SELLER',
                activationLink: activationLink,
                isActivated: false
            }
           });
          
           const userDto = new UserDTO(
            user.email, user.isActivated, user.id, data.role 
        );
           const token = authConfig.generateToken(userDto);
           return {token};
    }
    async registerDriver(data: CreateUserDTO): Promise<{}> {
         const isUserAlreadyExists = await db.user.findUnique({
            where:{
                email: data.email
            },
            
           });
           if (isUserAlreadyExists) {
            throw new CustomError(409, "email already exists");
           }
           
           const hashPassword = await bcrypt.hash(data.password, 10)
           const activationLink = uuidV4()
           const emailLink = 'http://localhost:5173/?token=' +activationLink;
           const emailData = new ActivationLinkDTO(data.email, emailLink, data.firstName)
           const mail = await mailService.sendActivationLink( emailData )

           console.log('mail sent: '  + mail)
           if (!mail) {
            throw new CustomError(409, 'problem while sending email')
           }
           const user =  await db.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashPassword,
                role: 'DELIVERY',
                activationLink: activationLink,
                isActivated: false
            }
           });
          
           const userDto = new UserDTO(
            user.email, user.isActivated, user.id, data.role 
        );
           const token = authConfig.generateToken(userDto);
           return {token};
    }
    async registerAdmin(data: CreateUserDTO): Promise<{}> {
         const isUserAlreadyExists = await db.user.findUnique({
            where:{
                email: data.email
            },
            
           });
           if (isUserAlreadyExists) {
            throw new CustomError(409, "email already exists");
           }
           
           const hashPassword = await bcrypt.hash(data.password, 10)
           const activationLink = uuidV4()
           const emailLink = 'http://localhost:5173/?token=' +activationLink;
           const emailData = new ActivationLinkDTO(data.email, emailLink, data.firstName)
           const mail = await mailService.sendActivationLink( emailData )
           
           console.log('mail sent: '  + mail)
           if (!mail) {
            throw new CustomError(409, 'problem while sending email')
           }
           const user =  await db.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashPassword,
                role: 'ADMIN',
                activationLink: activationLink,
                isActivated: false
            }
           });
          
           const userDto = new UserDTO(
            user.email, user.isActivated, user.id, data.role 
        );
           const token = authConfig.generateToken(userDto);
           return {token};
    }

    async activateUser(link: string): Promise<boolean> {
        const user = await db.user.findUnique({
            where:{
                activationLink: link
            }
        });
        if (!user) {
            throw new CustomError(404, 'user not found')
        }
         await db.user.update({
            where:{
                activationLink: link
            },
            data:{
                isActivated: true
            }
        });
        return true;
    }


    async login(data: LoginDTO): Promise<{
        access_token: any, refreshToken: any,  userDto: any
    }> {
        const user = await db.user.findUnique({
            where: {
                email: data.email
            }
        });
        if (!user) {
            throw new CustomError(404, "user does not exist");
        }
        const loginPassword = await bcrypt.compare(data.password, user.password)
        if (!loginPassword) {
            throw new CustomError(401, "invalid password")
        }
        const userDto = new UserDTO(
            user.email, user.isActivated, user.id, user.role
        )
        const token = await authConfig.generateToken(user)
        const saveToken = await authConfig.saveToken(user.id, token.refreshToken)
        
        return {
            ...token,
            userDto
        };
    }
    async logout(token: string): Promise<any> {
        return await db.refreshTokens.delete({
            where:{
                token
            }
        });
    }


    async refreshToken(token: string): Promise<any> {
        if (!token) {
            throw new CustomError(404, 'no token provided ')
        }
        const userData = await authConfig.validateRefreshToken(token)
        const tokenFromDb = await authConfig.findToken(token)
        
        if (!userData || !tokenFromDb) {
            throw new CustomError(404, 'user not found')
        }
        const user = await db.user.findUnique({
            where: {
                id: userData.userId
            }
        })
        const userDto = new UserDTO(
            user!.email, user!.isActivated, user!.id, user!.role
        )
        const tokens = await authConfig.generateToken(userDto)
        await authConfig.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            userDto
        }
    }

}