import {Router} from "express";
import { signupUser, signinUser, changePassword, logout } from "../controllers/auth.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import { validateCreateUser, validateChangePassword } from "../middlewares/validators/user.validator";

const authRouter = Router();

authRouter.post("/signup", validateCreateUser, signupUser);

authRouter.post("/signin", signinUser);

authRouter.post("/change_password", [authenticateUser, validateChangePassword], changePassword);

authRouter.post("/reset_password");

authRouter.post("/logout", authenticateUser, logout);


export default authRouter;