export class ActivationLinkDTO{
    email: string
    link: string
    name: string

    constructor(email: string, link: string, name: string){
        this.email =email
        this.link = link
        this.name = name
    }
}