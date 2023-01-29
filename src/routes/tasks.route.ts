import { Router } from "express";
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from "../controllers/tasks.controller";
import { authenticateUser, authorizeUser } from "../middlewares/auth.middleware";
import { validateCreateTask, validateUpdateTask } from "../middlewares/validators/task.validator";

const taskRouter = Router();

taskRouter.post("/", [authenticateUser, validateCreateTask], createTask);

taskRouter.get("/", authenticateUser, getAllTasks);

taskRouter.get("/:id", authenticateUser, getTaskById);

taskRouter.patch("/:id", [authenticateUser, authorizeUser, validateUpdateTask], updateTask);

taskRouter.delete("/:id", [authenticateUser, authorizeUser], deleteTask);

export default taskRouter