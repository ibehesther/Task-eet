"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_controller_1 = require("../controllers/tasks.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const task_validator_1 = require("../middlewares/validators/task.validator");
const taskRouter = (0, express_1.Router)();
taskRouter.post("/", [auth_middleware_1.authenticateUser, task_validator_1.validateCreateTask], tasks_controller_1.createTask);
taskRouter.get("/", auth_middleware_1.authenticateUser, tasks_controller_1.getAllTasks);
taskRouter.get("/:id", auth_middleware_1.authenticateUser, tasks_controller_1.getTaskById);
taskRouter.patch("/:id", [auth_middleware_1.authenticateUser, auth_middleware_1.authorizeUser, task_validator_1.validateUpdateTask], tasks_controller_1.updateTask);
taskRouter.delete("/:id", [auth_middleware_1.authenticateUser, auth_middleware_1.authorizeUser], tasks_controller_1.deleteTask);
exports.default = taskRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza3Mucm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL3Rhc2tzLnJvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQWlDO0FBQ2pDLHNFQUErRztBQUMvRyxvRUFBaUY7QUFDakYsNkVBQWtHO0FBRWxHLE1BQU0sVUFBVSxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO0FBRTVCLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsa0NBQWdCLEVBQUUsbUNBQWtCLENBQUMsRUFBRSw2QkFBVSxDQUFDLENBQUM7QUFFekUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsa0NBQWdCLEVBQUUsOEJBQVcsQ0FBQyxDQUFDO0FBRW5ELFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGtDQUFnQixFQUFFLDhCQUFXLENBQUMsQ0FBQztBQUV0RCxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLGtDQUFnQixFQUFFLCtCQUFhLEVBQUUsbUNBQWtCLENBQUMsRUFBRSw2QkFBVSxDQUFDLENBQUM7QUFFNUYsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxrQ0FBZ0IsRUFBRSwrQkFBYSxDQUFDLEVBQUUsNkJBQVUsQ0FBQyxDQUFDO0FBRXpFLGtCQUFlLFVBQVUsQ0FBQSJ9