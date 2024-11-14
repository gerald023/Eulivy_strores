import { NextFunction, Request, Response } from "express";
import {WebhookServiceImpl} from '../service/implemetation/exports';


class WebhookController{
    private webhookService: WebhookServiceImpl;

    constructor() {
      this.webhookService = new WebhookServiceImpl();
    }

    public handle = async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        try {
          const signature = <string>req.headers["x-paystack-signature"];
          await this.webhookService.verify(signature, req.body);
          res.status(200).send();
          await this.webhookService.handle(req.body);
        } catch (error) {
            console.log(error)
        }
      };
}

export default WebhookController;