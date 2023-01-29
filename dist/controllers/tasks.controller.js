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
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getAllTasks = exports.createTask = void 0;
const apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
const task_model_1 = require("../models/task.model");
const user_model_1 = require("../models/user.model");
const createTask = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Data contains a type field only when returning an error
        if ("type" in data)
            return next(data);
        let { user, validInput } = data;
        let creator = yield user_model_1.User.findById(user._id);
        if (!creator)
            throw Error();
        let task = yield task_model_1.Task.create(Object.assign({ creator: creator._id }, validInput));
        if (!task)
            throw Error();
        creator.tasks.push(task._id);
        creator.save();
        res.status(201).json({ task });
    }
    catch (err) {
        err.type = "bad request";
        next(err);
    }
});
exports.createTask = createTask;
const getAllTasks = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ("type" in data)
            return next(data);
        const tasks = new apiFeatures_1.default(task_model_1.Task.find({}), req.query)
            .filter()
            .sort()
            .paginate();
        res.json(yield tasks.query);
    }
    catch (err) {
        next(err);
    }
});
exports.getAllTasks = getAllTasks;
const getTaskById = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task_id = req.params.id;
    try {
        if ("type" in data)
            return next(data);
        const task = yield task_model_1.Task.findById(task_id);
        if (!task)
            throw Error();
        // check if the task was created by the user requesting it
        if (!task.creator.equals(data._id)) {
            let err = { type: "unauthorized" };
            next(err);
            return;
        }
        res.json(task);
        return;
    }
    catch (err) {
        err.type = "not found";
        next(err);
    }
});
exports.getTaskById = getTaskById;
const updateTask = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task_id = req.params.id;
    try {
        // Data contains a type field only when returning an error
        if ("type" in data)
            return next(data);
        const { validInput } = data;
        const filtered_input = Object.fromEntries(Object.entries(validInput).filter(([key, value]) => value !== undefined));
        const updatedTask = yield task_model_1.Task.findByIdAndUpdate({ _id: task_id }, { $set: filtered_input });
        if (!updatedTask)
            throw Error();
        res.json({ message: "Task updated successfully" });
    }
    catch (err) {
        err.type = "not found";
        next(err);
    }
});
exports.updateTask = updateTask;
const deleteTask = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task_id = req.params.id;
    try {
        if ("type" in data)
            return next(data);
        const task = yield task_model_1.Task.findById(task_id);
        if (!task)
            throw Error();
        let creator = yield user_model_1.User.findById(task.creator);
        if (!creator)
            throw Error();
        let creator_tasks = creator.tasks;
        creator_tasks.forEach((id, index) => __awaiter(void 0, void 0, void 0, function* () { return id.equals(task._id) && delete creator_tasks[index]; }));
        creator.tasks = creator_tasks;
        yield creator.save();
        yield task.delete();
        res.json({ message: "Task deleted successfully" });
        return;
    }
    catch (err) {
        err.type = "not found";
        next(err);
    }
});
exports.deleteTask = deleteTask;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza3MuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy90YXNrcy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVFQUErQztBQUMvQyxxREFBNEM7QUFDNUMscURBQTRDO0FBS3JDLE1BQU0sVUFBVSxHQUFHLENBQU8sSUFBd0IsRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUcsRUFBRTtJQUUzRyxJQUFHO1FBQ0MsMERBQTBEO1FBQzFELElBQUcsTUFBTSxJQUFJLElBQUk7WUFBRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNoQyxJQUFJLE9BQU8sR0FBRyxNQUFNLGlCQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU1QyxJQUFHLENBQUMsT0FBTztZQUFFLE1BQU0sS0FBSyxFQUFFLENBQUM7UUFFM0IsSUFBSSxJQUFJLEdBQUcsTUFBTSxpQkFBSSxDQUFDLE1BQU0saUJBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLElBQUssVUFBVSxFQUFFLENBQUM7UUFFcEUsSUFBRyxDQUFDLElBQUk7WUFBRSxNQUFNLEtBQUssRUFBRSxDQUFDO1FBRXhCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLENBQUM7S0FDaEM7SUFBQSxPQUFNLEdBQVEsRUFBQztRQUNaLEdBQUcsQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNiO0FBRUwsQ0FBQyxDQUFBLENBQUE7QUF2QlksUUFBQSxVQUFVLGNBdUJ0QjtBQUVNLE1BQU0sV0FBVyxHQUFHLENBQU0sSUFBb0IsRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUcsRUFBRTtJQUV2RyxJQUFHO1FBQ0MsSUFBRyxNQUFNLElBQUksSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJDLE1BQU0sS0FBSyxHQUFHLElBQUkscUJBQVcsQ0FBQyxpQkFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDO2FBQ2xDLE1BQU0sRUFBRTthQUNSLElBQUksRUFBRTthQUNOLFFBQVEsRUFBRSxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbkM7SUFBQSxPQUFNLEdBQUcsRUFBRTtRQUNSLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtLQUNaO0FBRUwsQ0FBQyxDQUFBLENBQUE7QUFkWSxRQUFBLFdBQVcsZUFjdkI7QUFFTSxNQUFNLFdBQVcsR0FBRyxDQUFNLElBQW9CLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFHLEVBQUU7SUFDdkcsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDOUIsSUFBRztRQUNDLElBQUcsTUFBTSxJQUFJLElBQUk7WUFBRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyQyxNQUFNLElBQUksR0FBRyxNQUFNLGlCQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTFDLElBQUcsQ0FBQyxJQUFJO1lBQUUsTUFBTSxLQUFLLEVBQUUsQ0FBQztRQUV4QiwwREFBMEQ7UUFDMUQsSUFBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQztZQUM5QixJQUFJLEdBQUcsR0FBVyxFQUFDLElBQUksRUFBRSxjQUFjLEVBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDVixPQUFNO1NBQ1Q7UUFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2YsT0FBTTtLQUVUO0lBQUEsT0FBTSxHQUFRLEVBQUU7UUFDYixHQUFHLENBQUMsSUFBSSxHQUFDLFdBQVcsQ0FBQTtRQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDYjtBQUVMLENBQUMsQ0FBQSxDQUFBO0FBdkJZLFFBQUEsV0FBVyxlQXVCdkI7QUFFTSxNQUFNLFVBQVUsR0FBRyxDQUFNLElBQXdCLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFHLEVBQUU7SUFDMUcsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDOUIsSUFBRztRQUNDLDBEQUEwRDtRQUMxRCxJQUFHLE1BQU0sSUFBSSxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckMsTUFBTSxFQUFHLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQztRQUU3QixNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUNyQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQ3pFLENBQUM7UUFFSixNQUFNLFdBQVcsR0FBRyxNQUFNLGlCQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUUsY0FBYyxFQUFDLENBQUMsQ0FBQztRQUN6RixJQUFHLENBQUMsV0FBVztZQUFFLE1BQU0sS0FBSyxFQUFFLENBQUM7UUFFL0IsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSwyQkFBMkIsRUFBQyxDQUFDLENBQUE7S0FDbkQ7SUFBQSxPQUFNLEdBQVEsRUFBQztRQUNaLEdBQUcsQ0FBQyxJQUFJLEdBQUMsV0FBVyxDQUFBO1FBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNiO0FBQ0wsQ0FBQyxDQUFBLENBQUE7QUFwQlksUUFBQSxVQUFVLGNBb0J0QjtBQUVNLE1BQU0sVUFBVSxHQUFHLENBQU0sSUFBb0IsRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUcsRUFBRTtJQUN0RyxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUU5QixJQUFHO1FBQ0MsSUFBRyxNQUFNLElBQUksSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJDLE1BQU0sSUFBSSxHQUFHLE1BQU0saUJBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFMUMsSUFBRyxDQUFDLElBQUk7WUFBRSxNQUFNLEtBQUssRUFBRSxDQUFDO1FBRXhCLElBQUksT0FBTyxHQUFHLE1BQU0saUJBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWhELElBQUcsQ0FBQyxPQUFPO1lBQUUsTUFBTSxLQUFLLEVBQUUsQ0FBQztRQUUzQixJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ2xDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsa0RBQUMsT0FBQSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQSxHQUFBLENBQUMsQ0FBQTtRQUM3RixPQUFPLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQTtRQUM3QixNQUFNLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVwQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLDJCQUEyQixFQUFDLENBQUMsQ0FBQztRQUNqRCxPQUFNO0tBQ1Q7SUFBQSxPQUFNLEdBQVEsRUFBQztRQUNaLEdBQUcsQ0FBQyxJQUFJLEdBQUMsV0FBVyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNiO0FBQ0wsQ0FBQyxDQUFBLENBQUE7QUExQlksUUFBQSxVQUFVLGNBMEJ0QiJ9