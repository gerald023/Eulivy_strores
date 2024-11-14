import { ROLES } from "./createUserDTO.dto"

export class UserDTO{
    email: string
    isActivated: boolean
    id: string
    role: ROLES

    constructor(email:string, isActivated: boolean, id: string, role: any){
        this.email =email
        this.isActivated = isActivated
        this.id = id
        this.role = role
    }
}