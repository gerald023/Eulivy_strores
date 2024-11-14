import { Router } from "express";
import UserController  from "../controller/userController.controller";
import { validationMiddleware } from "../middleware/validationMiddleware.middleware";
import { LoginDTO, CreateProfileDTO, CreateUserDTO, UpdateUserDTO } from "../dto/export";
import upload from "../middleware/multerConfig.config";
import { CheckRole, CheckAuth } from "../middleware/exports";



const userRouter = Router();

const userController = new UserController();

// const cateControl = new CategoryController()

userRouter.get("/all-users", CheckAuth, CheckRole('ADMIN', 'SELLER'), userController.getAllUsers);

userRouter.post("/getUserId", userController.getUserIdFromToken);

userRouter.patch("/update-user/:userId", CheckAuth, validationMiddleware(UpdateUserDTO), userController.updateUser);

userRouter.post("/:userId/create-profile", CheckAuth, validationMiddleware(CreateProfileDTO), upload.single("profileImage"), userController.createUserProfile);

userRouter.get("/profile/:userId", userController.getUserProfile);

userRouter.get("/all-profile",CheckRole('ADMIN'), userController.getAllProfile);

userRouter.patch("/update-profile/:userId", CheckAuth, upload.single('profileImage'), userController.updateProfile);

// userRouter.post('/create-cate', upload.single('image'), cateControl.createCategory)
userRouter.get("/:id", userController.getOneUser);



export default userRouter;