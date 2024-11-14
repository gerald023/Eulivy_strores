export enum ROLES {
    ADMIN,
    SELLER,
    BUYER,
    DELIVERY
  }
 
 class CreateUserDTO{
    firstName: string
    lastName: string
    email: string
    password: string
    role!: ROLES
    isActivated: boolean
    activationLink: string
    constructor(firstName:string, lastName:string, email:string, password: string, role: ROLES = ROLES.SELLER,
        isActivated: boolean,
        activationLink: string
    ){
        this.firstName =firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password
        this.role = role;
        this.isActivated = isActivated;
        this.activationLink = activationLink;
    }
}
export default CreateUserDTO;