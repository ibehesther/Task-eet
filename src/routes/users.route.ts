import { Router } from "express";
import { updateUser, deleteUser } from "../controllers/users.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import { validateUpdateUser } from "../middlewares/validators/user.validator";

const userRouter = Router();


userRouter.patch("/", [ authenticateUser, validateUpdateUser], updateUser);

userRouter.delete("/", authenticateUser, deleteUser);

export default userRouter;