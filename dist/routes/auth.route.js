"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user_validator_1 = require("../middlewares/validators/user.validator");
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", user_validator_1.validateCreateUser, auth_controller_1.signupUser);
authRouter.post("/signin", auth_controller_1.signinUser);
authRouter.post("/change_password", [auth_middleware_1.authenticateUser, user_validator_1.validateChangePassword], auth_controller_1.changePassword);
authRouter.post("/reset_password");
authRouter.post("/logout", auth_middleware_1.authenticateUser, auth_controller_1.logout);
exports.default = authRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5yb3V0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvYXV0aC5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUErQjtBQUMvQixvRUFBZ0c7QUFDaEcsb0VBQWtFO0FBQ2xFLDZFQUFzRztBQUV0RyxNQUFNLFVBQVUsR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQztBQUU1QixVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxtQ0FBa0IsRUFBRSw0QkFBVSxDQUFDLENBQUM7QUFFM0QsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsNEJBQVUsQ0FBQyxDQUFDO0FBRXZDLFVBQVUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxrQ0FBZ0IsRUFBRSx1Q0FBc0IsQ0FBQyxFQUFFLGdDQUFjLENBQUMsQ0FBQztBQUVoRyxVQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFbkMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsa0NBQWdCLEVBQUUsd0JBQU0sQ0FBQyxDQUFDO0FBR3JELGtCQUFlLFVBQVUsQ0FBQyJ9