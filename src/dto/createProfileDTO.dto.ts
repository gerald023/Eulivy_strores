 class CreateProfileDTO{
    username: string
    bio: string
    profileImage:Express.Multer.File
    userId: string
    constructor(username:string, bio:string, profileImage:Express.Multer.File, userId: string){
        this.username =username;
        this.bio = bio;
        this.profileImage = profileImage;
        this.userId = userId;
    }
}
export default CreateProfileDTO;