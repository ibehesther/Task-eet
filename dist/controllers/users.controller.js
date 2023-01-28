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
const { Task } = require("../models/task.model");
const { User } = require("../models/user.model");
exports.updateUser = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, validInput, type } = data;
    try {
        // Data contains a type field only when returning an error
        if (!type) {
            // filter out the field(s) that are not undefined
            let filtered_input = {};
            let filtered_fields = Object.keys(validInput).filter((field) => validInput[field] !== undefined);
            filtered_fields.forEach((field) => filtered_input[field] = validInput[field]);
            const updatedUser = yield User.findByIdAndUpdate({ _id: user._id }, { $set: filtered_input });
            if (updatedUser) {
                res.json({ message: "User updated successfully" });
                return;
            }
        }
        else {
            next(data);
        }
    }
    catch (err) {
        next(err);
    }
});
exports.deleteUser = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Data contains a type field only when returning an error
        if (!data.type) {
            let user = yield User.findById(data._id);
            // delete all the tasks created by the user
            user.tasks.forEach((id) => __awaiter(void 0, void 0, void 0, function* () { return yield Task.findByIdAndDelete(id); }));
            yield user.delete();
            // remove the cookie from cookie storage
            res.clearCookie("access_token")
                .json({ message: "User deleted successfully" });
            return;
        }
        else {
            next(data);
        }
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy91c2Vycy5jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDakQsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBR2pELE9BQU8sQ0FBQyxVQUFVLEdBQUcsQ0FBTSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUMvQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFDeEMsSUFBRztRQUNDLDBEQUEwRDtRQUMxRCxJQUFHLENBQUMsSUFBSSxFQUFDO1lBQ0wsaURBQWlEO1lBQ2pELElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQTtZQUN2QixJQUFJLGVBQWUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFBO1lBQ2hHLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUU5RSxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUUsY0FBYyxFQUFDLENBQUMsQ0FBQztZQUMxRixJQUFHLFdBQVcsRUFBQztnQkFDWCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLDJCQUEyQixFQUFDLENBQUMsQ0FBQTtnQkFDaEQsT0FBTzthQUNWO1NBQ0o7YUFDRztZQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNkO0tBQ0o7SUFBQSxPQUFNLEdBQUcsRUFBQztRQUNQLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNiO0FBQ0wsQ0FBQyxDQUFBLENBQUE7QUFFRCxPQUFPLENBQUMsVUFBVSxHQUFHLENBQU0sSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDL0MsSUFBRztRQUNDLDBEQUEwRDtRQUMxRCxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQztZQUNWLElBQUksSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFekMsMkNBQTJDO1lBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQU0sRUFBRSxFQUFFLEVBQUUsa0RBQUMsT0FBQSxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQSxHQUFBLENBQUMsQ0FBQztZQUNsRSxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUVwQix3Q0FBd0M7WUFDeEMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUM7aUJBQzFCLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSwyQkFBMkIsRUFBQyxDQUFDLENBQUM7WUFDbEQsT0FBTztTQUNWO2FBQ0c7WUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDZDtLQUNKO0lBQUEsT0FBTSxHQUFHLEVBQUM7UUFDUCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDYjtBQUNMLENBQUMsQ0FBQSxDQUFBIn0=