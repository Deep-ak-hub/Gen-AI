import express from "express"
import { authController } from "../controllers/auth.controller.js";
import validateBodyData from "../middleware/validator.middleware.js";
import { ForgetPasswordDTO, LoginDTO, RegisterDTO, ResetPasswordDTO, updateUserDTO } from "../validators/auth.validator.js";
import loginCheck from "../middleware/auth.middleware.js";

const authRouter = express.Router()


authRouter.post("/register" ,validateBodyData(RegisterDTO) ,authController.registerUser);
authRouter.get("/activate/:token", authController.activateUserByToken);
authRouter.get("/resend-activation-token/:token", authController.resendActivationToken)
authRouter.post("/login", validateBodyData(LoginDTO) ,authController.loginUser);

authRouter.get("/me", loginCheck() ,authController.getLoggedInUserProfile);
authRouter.put("/:userId/edit-user", loginCheck(), validateBodyData(updateUserDTO), authController.updateUserProfile);

authRouter.post("/forget-password", validateBodyData(ForgetPasswordDTO) ,authController.forgetPasswordRequest);
authRouter.get("/verify-token/:token", authController.verifyForgetPassword)
authRouter.post("/reset-password/:token", validateBodyData(ResetPasswordDTO) ,authController.resetPassword);


authRouter.post("/logout", authController.userProfileLogout);

export default authRouter;
