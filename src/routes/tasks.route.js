const express = require("express");
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require("../controllers/tasks.controller");
const { validateUser } = require("../middlewares/auth.middleware");

const taskRouter = express.Router();

taskRouter.post("/", createTask);

taskRouter.get("/", getAllTasks);

taskRouter.get("/:id", getTaskById);

taskRouter.patch("/:id", updateTask);

taskRouter.delete("/:id", deleteTask)

module.exports = taskRouter