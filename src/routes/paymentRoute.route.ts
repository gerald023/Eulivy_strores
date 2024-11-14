import { Router } from "express";
import { validationMiddleware } from "../middleware/validationMiddleware.middleware";
import {PaymentDTO} from '../dto/export';
import {PaymentController} from '../controller/exports';


const paymentRoute = Router();
const paymentController = new PaymentController();

paymentRoute.post("/", validationMiddleware(PaymentDTO), paymentController.pay);
export default paymentRoute;