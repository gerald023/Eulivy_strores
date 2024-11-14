import { Router } from "express";
import { AuthController } from "../controller/exports";
import { validationMiddleware } from "../middleware/validationMiddleware.middleware";
import {CreateUserDTO, LoginDTO} from "../dto/export";


const AuthRouter = Router()

const authController = new AuthController()

AuthRouter.post('/signup', validationMiddleware(CreateUserDTO), authController.registration)
AuthRouter.post('/seller/signup', validationMiddleware(CreateUserDTO), authController.registerSeller)
AuthRouter.post('/driver/signup', validationMiddleware(CreateUserDTO), authController.registerDriver)
AuthRouter.post('/admin/signup', validationMiddleware(CreateUserDTO), authController.registerAdmin)
AuthRouter.post('/login', validationMiddleware(LoginDTO), authController.login);
AuthRouter.get('/activate/:link', authController.activateUser);
AuthRouter.post('/logout', authController.logout)
AuthRouter.get('/refresh-token', authController.refreshToken)


export default AuthRouter;