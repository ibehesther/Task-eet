const express = require("express");
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require("../controllers/tasks.controller");
const { authenticateUser, authorizeUser } = require("../middlewares/auth.middleware");
const { validateCreateTask, validateUpdateTask } = require("../middlewares/validators/task.validator");

const taskRouter = express.Router();

taskRouter.post("/", [authenticateUser, validateCreateTask], createTask);

taskRouter.get("/", authenticateUser, getAllTasks);

taskRouter.get("/:id", authenticateUser, getTaskById);

taskRouter.patch("/:id", [authenticateUser, authorizeUser, validateUpdateTask], updateTask);

taskRouter.delete("/:id", [authenticateUser, authorizeUser], deleteTask);

module.exports = taskRouter