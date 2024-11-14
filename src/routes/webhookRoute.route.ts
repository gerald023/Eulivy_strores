import { Router } from "express";
import {WebhookController} from '../controller/exports'

const webhookRouter = Router();
const webhookController = new WebhookController();

webhookRouter.post("/", webhookController.handle);

export default webhookRouter;