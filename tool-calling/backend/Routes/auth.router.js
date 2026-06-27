import express from "express"
import validateBodyData from '../../middlewares/validator.middleware'
import { RegisterDTO, LoginDTO, ForgetPasswordDTO, ResetPasswordDTO, updateUserDTO } from '../auth/auth.validator.js'
import uploader from '../../middlewares/uploader.middleware'
import authController from '../auth/auth.controller'

const authRouter = express.Router()

authRouter.post("/register", uploader().single('image') ,validateBodyData(RegisterDTO) ,authController.registerUser);
authRouter.get("/activate/:token", authController.activateUserByToken);
authRouter.get("/resend-activation-token/:token", authController.resendActivationToken)
authRouter.post("/login", validateBodyData(LoginDTO) ,authController.loginUser);

authRouter.post("/forget-password", validateBodyData(ForgetPasswordDTO) ,authController.forgetPasswordRequest);
authRouter.get("/verify-token/:token", authController.verifyForgetPassword)
authRouter.post("/reset-password/:token", validateBodyData(ResetPasswordDTO) ,authController.resetPassword);

export default authRouter
