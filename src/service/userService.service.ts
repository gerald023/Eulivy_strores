import { Prisma, User, UserProfile } from "@prisma/client";
import { CreateProfileDTO, UpdateProfileDTO, UpdateUserDTO } from "../dto/export";


export interface UserService{
    getOneUser(id: string) : Promise<User | null>;
    updateUser(data: UpdateUserDTO) : Promise<User>;
    deleteOneUser(id:string):Promise<User | null>;
    getAllUsers():Promise<User[]>
    createUserProfile(data: CreateProfileDTO): Promise<UserProfile | null>
    getUserProfile(userId: string): Promise<UserProfile | null>
    getAllProfile(): Promise<UserProfile[]>
    updateProfile(data: UpdateProfileDTO): Promise<UserProfile>
    getUserIdFromToken(jwt: string): Promise<number>
}