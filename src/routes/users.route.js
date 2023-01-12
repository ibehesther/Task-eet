const express = require("express");
const { updateUser, deleteUser } = require("../controllers/users.controller");
const { authenticateUser } = require("../middlewares/auth.middleware");
const { validateUpdateUser } = require("../middlewares/validators/user.validator");

const userRouter = express.Router();

userRouter.get("/", (req, res) => res.send("successful"));

userRouter.patch("/", [ authenticateUser, validateUpdateUser], updateUser);

userRouter.delete("/", authenticateUser, deleteUser);

module.exports = userRouter;