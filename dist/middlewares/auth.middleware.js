"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeUser = exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const task_model_1 = require("../models/task.model");
const user_model_1 = require("../models/user.model");
const { JWT_SECRET } = process.env;
// Ensure the user is authenticated
// i.e registered 
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    // check if the request has cookies
    if (!cookies) {
        throw Error();
    }
    const token = cookies.access_token;
    try {
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const { _id, email } = payload;
        const user = yield user_model_1.User.findOne({ _id, email });
        if (!user) {
            let error = { type: "not found" };
            next(error);
            return;
        }
        next(user);
    }
    catch (error) {
        error.type = "unauthenticated";
        next(error);
    }
});
exports.authenticateUser = authenticateUser;
const authorizeUser = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task_id = req.params.id;
    try {
        if ("type" in data)
            return next(data);
        const task = yield task_model_1.Task.findById(task_id);
        if (!task) {
            let error = { type: "not found" };
            next(error);
            return;
        }
        // if logged in user is not the task creator
        let isUserTheCreator = data._id.equals(task.creator);
        if (!isUserTheCreator) {
            let error = { type: "unauthorized" };
            next(error);
            return;
        }
        next(data);
    }
    catch (err) {
        next(err);
    }
});
exports.authorizeUser = authorizeUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZGRsZXdhcmVzL2F1dGgubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnRUFBK0I7QUFDL0Isb0RBQTRCO0FBQzVCLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDZixxREFBNEM7QUFDNUMscURBQTZDO0FBTTdDLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFBO0FBRWxDLG1DQUFtQztBQUNuQyxrQkFBa0I7QUFDWCxNQUFNLGdCQUFnQixHQUFHLENBQU0sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDckYsTUFBTSxPQUFPLEdBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUMzQixtQ0FBbUM7SUFDbkMsSUFBRyxDQUFDLE9BQU8sRUFBQztRQUNSLE1BQU0sS0FBSyxFQUFFLENBQUM7S0FDakI7SUFDRCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO0lBQ25DLElBQUc7UUFDQyxNQUFNLE9BQU8sR0FBSSxzQkFBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBb0IsQ0FBUSxDQUFDO1FBQ2hFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQy9CLE1BQU0sSUFBSSxHQUFHLE1BQU0saUJBQUksQ0FBQyxPQUFPLENBQUMsRUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUM5QyxJQUFHLENBQUMsSUFBSSxFQUFDO1lBQ0wsSUFBSSxLQUFLLEdBQVcsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ1osT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2Q7SUFBQSxPQUFNLEtBQVUsRUFBRTtRQUNmLEtBQUssQ0FBQyxJQUFJLEdBQUMsaUJBQWlCLENBQUE7UUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0tBQ2Q7QUFDTCxDQUFDLENBQUEsQ0FBQTtBQXJCWSxRQUFBLGdCQUFnQixvQkFxQjVCO0FBRU0sTUFBTSxhQUFhLEdBQUcsQ0FBTSxJQUFvQixFQUFHLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ3pHLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0lBRTlCLElBQUc7UUFDQyxJQUFHLE1BQU0sSUFBSSxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckMsTUFBTSxJQUFJLEdBQUcsTUFBTSxpQkFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxJQUFHLENBQUMsSUFBSSxFQUFDO1lBQ0wsSUFBSSxLQUFLLEdBQVcsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ1osT0FBTztTQUNWO1FBRUQsNENBQTRDO1FBQzVDLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELElBQUcsQ0FBQyxnQkFBZ0IsRUFBQztZQUNqQixJQUFJLEtBQUssR0FBRyxFQUFDLElBQUksRUFBRSxjQUFjLEVBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDWixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDZDtJQUFBLE9BQU0sR0FBUSxFQUFDO1FBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2I7QUFDTCxDQUFDLENBQUEsQ0FBQTtBQXhCWSxRQUFBLGFBQWEsaUJBd0J6QiJ9