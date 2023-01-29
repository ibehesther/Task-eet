"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user_validator_1 = require("../middlewares/validators/user.validator");
const userRouter = (0, express_1.Router)();
userRouter.patch("/", [auth_middleware_1.authenticateUser, user_validator_1.validateUpdateUser], users_controller_1.updateUser);
userRouter.delete("/", auth_middleware_1.authenticateUser, users_controller_1.deleteUser);
exports.default = userRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMucm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL3VzZXJzLnJvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQWlDO0FBQ2pDLHNFQUF5RTtBQUN6RSxvRUFBa0U7QUFDbEUsNkVBQThFO0FBRTlFLE1BQU0sVUFBVSxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO0FBRzVCLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUUsa0NBQWdCLEVBQUUsbUNBQWtCLENBQUMsRUFBRSw2QkFBVSxDQUFDLENBQUM7QUFFM0UsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsa0NBQWdCLEVBQUUsNkJBQVUsQ0FBQyxDQUFDO0FBRXJELGtCQUFlLFVBQVUsQ0FBQyJ9