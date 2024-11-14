import { ActivationLinkDTO } from '../dto/export';


export interface MailService{
    sendActivationLink(linkData: ActivationLinkDTO): Promise<null>
}