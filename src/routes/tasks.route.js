const express = require("express");
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require("../controllers/tasks.controller");
const { validateUser } = require("../middlewares/auth.middleware");
const { validateCreateTask, validateUpdateTask } = require("../middlewares/validators/task.validator");

const taskRouter = express.Router();

taskRouter.post("/", [validateUser, validateCreateTask], createTask);

taskRouter.get("/", validateUser, getAllTasks);

taskRouter.get("/:id", validateUser, getTaskById);

taskRouter.patch("/:id", [validateUser, validateUpdateTask], updateTask);

taskRouter.delete("/:id", validateUser, deleteTask);

module.exports = taskRouter