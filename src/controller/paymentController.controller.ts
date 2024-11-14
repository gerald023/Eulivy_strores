import { NextFunction, Request, Response } from 'express';
import {PaymentServiceImpl} from '../service/implemetation/exports'
import {PaymentDTO} from '../dto/export';


class PaymentController{
    private paymentService: PaymentServiceImpl;
    constructor(){
        this.paymentService = new PaymentServiceImpl()
    } 

    public pay = async(req: Request, res:Response, next: NextFunction): Promise<void>=>{
        try {
            const paymentDto:PaymentDTO = req.body;
            const response = await this.paymentService.pay(paymentDto);
            res.status(200).json(response);
          } catch (error) {
            next(error);
          }
    }
}

export default PaymentController;