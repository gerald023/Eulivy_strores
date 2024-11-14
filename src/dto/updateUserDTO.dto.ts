import { IsString } from "class-validator";

export class UpdateUserDTO{
    @IsString()
    id!:string

    @IsString()
    firstName!: string

    @IsString()
    lastName!: string

    @IsString()
    email!: string

    constructor(id: string, email: string, firstName: string, lastName: string){
        this.id = id
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
    }
}