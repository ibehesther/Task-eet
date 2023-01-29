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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = void 0;
const task_model_1 = require("../models/task.model");
const user_model_1 = require("../models/user.model");
function instanceOfIInput(object) {
    return 'first_name' in object || 'last_name' in object || 'email' in object ||
        'password' in object || 'new_password' in object || 'tasks' in object;
}
const updateUser = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Data contains a type field only when returning an error
        if ("type" in data)
            return next(data);
        const { user, validInput } = data;
        // filter out the field(s) that are not undefined
        const filtered_input = Object.fromEntries(Object.entries(validInput).filter(([key, value]) => value !== undefined));
        const updatedUser = yield user_model_1.User.findByIdAndUpdate({ _id: user._id }, { $set: filtered_input });
        if (updatedUser) {
            res.json({ message: "User updated successfully" });
            return;
        }
    }
    catch (err) {
        next(err);
    }
});
exports.updateUser = updateUser;
const deleteUser = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Data contains a type field only when returning an error
        if ("type" in data)
            return next(data);
        let user = yield user_model_1.User.findById(data._id);
        if (!user)
            throw Error();
        // delete all the tasks created by the user
        user.tasks.forEach((id) => __awaiter(void 0, void 0, void 0, function* () { return yield task_model_1.Task.findByIdAndDelete(id); }));
        yield user.delete();
        // remove the cookie from cookie storage
        res.clearCookie("access_token")
            .json({ message: "User deleted successfully" });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy91c2Vycy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLHFEQUE0QztBQUM1QyxxREFBNEM7QUFJNUMsU0FBUyxnQkFBZ0IsQ0FBQyxNQUFXO0lBQ2pDLE9BQU8sWUFBWSxJQUFJLE1BQU0sSUFBSSxXQUFXLElBQUksTUFBTSxJQUFJLE9BQU8sSUFBSSxNQUFNO1FBQzNFLFVBQVUsSUFBSSxNQUFNLElBQUksY0FBYyxJQUFJLE1BQU0sSUFBSSxPQUFPLElBQUksTUFBTSxDQUFDO0FBQzFFLENBQUM7QUFFTSxNQUFNLFVBQVUsR0FBRyxDQUFNLElBQXdCLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDekcsSUFBRztRQUNDLDBEQUEwRDtRQUMxRCxJQUFHLE1BQU0sSUFBSSxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckMsTUFBTSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFFbEMsaURBQWlEO1FBQ2pELE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQ3JDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FDekUsQ0FBQztRQUNKLE1BQU0sV0FBVyxHQUFHLE1BQU0saUJBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUUsY0FBYyxFQUFDLENBQUMsQ0FBQztRQUMxRixJQUFHLFdBQVcsRUFBQztZQUNYLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsMkJBQTJCLEVBQUMsQ0FBQyxDQUFBO1lBQ2hELE9BQU87U0FDVjtLQUNKO0lBQUEsT0FBTSxHQUFRLEVBQUM7UUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDYjtBQUNMLENBQUMsQ0FBQSxDQUFBO0FBbkJZLFFBQUEsVUFBVSxjQW1CdEI7QUFFTSxNQUFNLFVBQVUsR0FBRyxDQUFNLElBQW9CLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDckcsSUFBRztRQUNDLDBEQUEwRDtRQUMxRCxJQUFHLE1BQU0sSUFBSSxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckMsSUFBSSxJQUFJLEdBQUcsTUFBTSxpQkFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFekMsSUFBSSxDQUFDLElBQUk7WUFBRSxNQUFNLEtBQUssRUFBRSxDQUFDO1FBRXpCLDJDQUEyQztRQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFNLEVBQUUsRUFBRSxFQUFFLGtEQUFDLE9BQUEsTUFBTSxpQkFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFBLEdBQUEsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRXBCLHdDQUF3QztRQUN4QyxHQUFHLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQzthQUMxQixJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsMkJBQTJCLEVBQUMsQ0FBQyxDQUFDO0tBQ3JEO0lBQUEsT0FBTSxHQUFHLEVBQUM7UUFDUCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDYjtBQUNMLENBQUMsQ0FBQSxDQUFBO0FBbkJZLFFBQUEsVUFBVSxjQW1CdEIifQ==