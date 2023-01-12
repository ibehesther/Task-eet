const express = require("express");
const { signupUser, signinUser, changePassword, logout } = require("../controllers/auth.controller");
const { authenticateUser } = require("../middlewares/auth.middleware");
const { validateCreateUser, validateChangePassword } = require("../middlewares/validators/user.validator");

const authRouter = express.Router();

authRouter.post("/signup", validateCreateUser, signupUser);

authRouter.post("/signin", signinUser);

authRouter.post("/change_password", [authenticateUser, validateChangePassword], changePassword);

authRouter.post("/reset_password");

authRouter.post("/logout", authenticateUser, logout);


module.exports = authRouter;