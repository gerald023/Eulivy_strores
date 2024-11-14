import { User } from "@prisma/client";
import {CreateUserDTO, LoginDTO} from "../dto/export";

export interface AuthService{
    registration(data: CreateUserDTO): Promise<{}>
    registerSeller(data: CreateUserDTO): Promise<{}>
    registerDriver(data: CreateUserDTO): Promise<{}>
    registerAdmin(data: CreateUserDTO): Promise<{}>
    activateUser(link: string): Promise<boolean>
    login(data: LoginDTO): Promise<{}>
    logout(token: string): Promise<string>
    refreshToken(token: string): Promise<string>
}