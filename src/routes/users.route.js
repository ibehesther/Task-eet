const express = require("express");
const { updateUser, deleteUser } = require("../controllers/users.controller");
const { validateUser } = require("../middlewares/auth.middleware");
const { validateUpdateUser } = require("../middlewares/validators/user.validator");

const userRouter = express.Router();

userRouter.get("/", (req, res) => res.send("successful"));

userRouter.patch("/", [ validateUser, validateUpdateUser], updateUser);

userRouter.delete("/", validateUser, deleteUser);

module.exports = userRouter;