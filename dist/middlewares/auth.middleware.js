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
const jwt = require("jsonwebtoken");
const { Task } = require("../models/task.model");
const { User } = require("../models/user.model");
require("dotenv").config();
const { JWT_SECRET } = process.env;
// Ensure the user is authenticated
// i.e registered 
exports.authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    // check if the request has cookies
    if (!cookies) {
        throw Error();
    }
    const token = cookies.access_token;
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const { _id, email } = payload;
        const user = yield User.findOne({ _id, email });
        if (!user) {
            let error = {};
            error.type = "not found";
            next(error);
        }
        next(user);
    }
    catch (err) {
        let error = {};
        error.type = "unauthenticated";
        next(error);
    }
});
exports.authorizeUser = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task_id = req.params.id;
    try {
        if (data.type) {
            next(data);
            return;
        }
        const task = yield Task.findById(task_id);
        if (!task) {
            let error = new Error();
            error.type = "bad request";
            next(error);
            return;
        }
        // return unauthorized error
        // if logged in user is not the task creator
        isUserTheCreator = data._id.equals(task.creator);
        if (!isUserTheCreator) {
            let error = new Error();
            error.type = "unauthorized";
            next(error);
            return;
        }
        next(data);
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZGRsZXdhcmVzL2F1dGgubWlkZGxld2FyZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNqRCxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDakQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBRTFCLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFBO0FBRWxDLG1DQUFtQztBQUNuQyxrQkFBa0I7QUFDbEIsT0FBTyxDQUFDLGdCQUFnQixHQUFHLENBQU0sR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUMvQyxNQUFNLE9BQU8sR0FBRSxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQzNCLG1DQUFtQztJQUNuQyxJQUFHLENBQUMsT0FBTyxFQUFDO1FBQ1IsTUFBTSxLQUFLLEVBQUUsQ0FBQztLQUNqQjtJQUNELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7SUFDbkMsSUFBRztRQUNDLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQy9CLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQzlDLElBQUcsQ0FBQyxJQUFJLEVBQUM7WUFDTCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDZixLQUFLLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQTtZQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDZDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNkO0lBQUEsT0FBTSxHQUFHLEVBQUU7UUFDUixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUE7UUFDZCxLQUFLLENBQUMsSUFBSSxHQUFDLGlCQUFpQixDQUFBO1FBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUNkO0FBQ0wsQ0FBQyxDQUFBLENBQUE7QUFFRCxPQUFPLENBQUMsYUFBYSxHQUFHLENBQU0sSUFBSSxFQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDbkQsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFFOUIsSUFBRztRQUNDLElBQUcsSUFBSSxDQUFDLElBQUksRUFBQztZQUNULElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNYLE9BQU87U0FDVjtRQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxJQUFHLENBQUMsSUFBSSxFQUFDO1lBQ0wsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUN4QixLQUFLLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQztZQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDWixPQUFPO1NBQ1Y7UUFFRCw0QkFBNEI7UUFDNUIsNENBQTRDO1FBQzVDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFHLENBQUMsZ0JBQWdCLEVBQUM7WUFDakIsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUN4QixLQUFLLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDWixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDZDtJQUFBLE9BQU0sR0FBRyxFQUFDO1FBQ1AsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2I7QUFDTCxDQUFDLENBQUEsQ0FBQSJ9