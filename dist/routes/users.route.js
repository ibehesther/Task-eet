"use strict";
const express = require("express");
const { updateUser, deleteUser } = require("../controllers/users.controller");
const { authenticateUser } = require("../middlewares/auth.middleware");
const { validateUpdateUser } = require("../middlewares/validators/user.validator");
const userRouter = express.Router();
userRouter.patch("/", [authenticateUser, validateUpdateUser], updateUser);
userRouter.delete("/", authenticateUser, deleteUser);
module.exports = userRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMucm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL3VzZXJzLnJvdXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUM5RSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsR0FBRyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztBQUN2RSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxPQUFPLENBQUMsMENBQTBDLENBQUMsQ0FBQztBQUVuRixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFHcEMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBRTNFLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBRXJELE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDIn0=