import { IsNotEmpty, IsString } from "class-validator";



export class UpdateProfileDTO{
    @IsNotEmpty()
    @IsString()
    id!: string

    @IsString()
    username!: string 

    
    @IsString()
    bio!: string

    profileImage!:Express.Multer.File

    constructor(bio: string, username: string, id: string, profileImage:Express.Multer.File){
        this.bio = bio
        this.username = username
        this.id = id
        this.profileImage = profileImage
    }

}