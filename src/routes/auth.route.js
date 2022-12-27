const express = require("express");
const { signupUser, signinUser } = require("../controllers/auth.controller");
const { validateCreateUser } = require("../validators/user.validator");

const authRouter = express.Router();

authRouter.post("/signup", validateCreateUser, signupUser);

authRouter.post("/signin", signinUser);


module.exports = authRouter;