import { User, UserProfile } from '@prisma/client';
import {UserService} from '../userService.service';
import { db } from '../../utils/db.utils'
import { CustomError } from '../../error/customError.error';
import { AuthConfig } from '../../config/authConfig.config';
import { CreateProfileDTO, UpdateProfileDTO, UpdateUserDTO} from '../../dto/export';
import CloudnaryServiceImpl from './cloudinaryServiceImpl.impl';

const genToken = new AuthConfig()
const cloudinaryService = new CloudnaryServiceImpl();

class UserServiceImpl implements UserService{
   
   
   
    /* getting one of the users by id */
    async getOneUser(id: string): Promise<User | null> {
        const user = await db.user.findFirst({
            where:{ id },
            include:{
                profile: true,
                Transaction: {
                    where: {
                        status: 'successful'
                    }
                }
            }
        });
        if (!user) {
            throw new CustomError(404, `user with the id ${id} does not exists`);
        }
        return user;
    }

    /* updating user by the id */
    async updateUser(data: UpdateUserDTO): Promise<User> {
       const isUserAlreadyExists = await db.user.findUnique({
        where:{
            id: data.id
        }
       });
       if (!isUserAlreadyExists) {
        throw new CustomError(404, `user with the id ${data.id} not found`)
       }
       if (data.email) {
        const isEmailExists = await db.user.findUnique({
            where:{ email: data.email as string }
        })
        if (isEmailExists && isEmailExists.id !== data.id) {
            throw new CustomError(404, `Email already exist`);
        }
       }
       return await db.user.update({
        where:{
            id: data.id
        },
        data:{
            email: data.email || isUserAlreadyExists.email,
            firstName: data.firstName || isUserAlreadyExists.firstName,
            lastName: data.lastName || isUserAlreadyExists.lastName,
        }
       });
    }

    /* deleting one user by id */

    async deleteOneUser(id: string): Promise<User | null> {
        const isUser = await db.user.findUnique({
            where:{ id }
        });
        if (!isUser) {
            throw new CustomError(404, `user with the id ${id} not found`)
        }
        await db.user.delete({
            where: {id: id},
        })
        return isUser;
    }

    /* getting all the users */
    async getAllUsers(): Promise<User[]> {
        return await db.user.findMany({
            include:{
                profile: true,
                Transaction: {
                    where: {
                        status: 'successful'
                    }
                }
            }
        })
    }

    /* getting user's id from jwt */
    getUserIdFromToken(jwt: string): Promise<number> {
        const decodedToken =  genToken.validateAccessToken(jwt);
        if(!jwt){
          throw new CustomError(400, "invalid jwt validation")
        }
        if (!decodedToken || !decodedToken.userId) {
          throw new CustomError(404, "user does not exists");
        }
        const userId = decodedToken.userId;
        return userId;
    }

    async createUserProfile(data: CreateProfileDTO): Promise<UserProfile | null> {
        const doesUserHasProfile = await db.userProfile.findUnique({
            where: {
                id: data.userId
            }
        });
        if (doesUserHasProfile) {
            throw new CustomError(409, 'user already has a profile')
        }
        
        const imageUrl = await cloudinaryService.uploadSingle(data.profileImage)
        return await db.userProfile.create({
            data: {
                profileImage: imageUrl,
                username: data.username,
                bio: data.bio,
                userID: data.userId
            }
        })
    }
    async getUserProfile(userId: string): Promise<UserProfile | null> {
        return await db.userProfile.findUnique({
            where: {
                userID: userId
            }
        })
    }

    async getAllProfile(): Promise<UserProfile[]> {
        const allProfile = await db.userProfile.findMany()
        return allProfile
    }
    async updateProfile(data: UpdateProfileDTO): Promise<UserProfile> {
        const profile = await db.userProfile.findFirst({
            where: { 
                userID: data.id
            }
        });
        if (!profile) {
            throw new CustomError(404, 'Profile not found')
        }
        // const uploadedImage = await cloudinaryService.updateProfileImage(data.profileImage)
        const imageUrl = await cloudinaryService.uploadSingle(data.profileImage)
        // const imagePath = uploadedImage?.secure_url;
        const updateProfile = await db.userProfile.update({
            where:{
                userID: data.id
            },
            data: {
                bio: data.bio || profile.bio,
                profileImage: imageUrl || profile.profileImage,
                username: data.username || profile.username
            }
        }) 
        return updateProfile;
    }


    async uploadProfileImages(files: Express.Multer.File) {
        const uploadResults : any = await cloudinaryService.uploadSingle(files);
        return uploadResults.secure_url; 
      }

}


export default UserServiceImpl;