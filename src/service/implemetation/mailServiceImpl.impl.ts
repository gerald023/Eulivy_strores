import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
import { MailService } from '../exports';
import { ActivationLinkDTO } from '../../dto/export';

dotenv.config()
export class MailServiceImpl implements MailService{
    transporter: any;
    constructor(){
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
        })
    }
    async sendActivationLink(linkData: ActivationLinkDTO): Promise<null> {
        return await this.transporter.sendMail({
            form: process.env.SMTP_USER,
            to: linkData.email,
            subject: 'activation account on' + 'Eulivy Stores',
            text: '',
            html: `
                <div>
                <h1> Hello ${linkData.name} 👋</h1>
                    <h1>Click the link below to activate your account</h1>
                    <button style={background: blue, color: white}> <a href="${linkData.link}">click here!</a> </button>
                </div>
            `
        });
    }
   
}