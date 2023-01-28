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
const APIFeatures = require("../../utils/apiFeatures");
const { Task } = require("../models/task.model");
const { User } = require("../models/user.model");
exports.createTask = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, validInput, type } = data;
    try {
        // Data contains a type field only when returning an error
        if (!type) {
            let creator = yield User.findById(user._id);
            let task = yield Task.create(Object.assign({ creator: creator._id }, validInput));
            creator.tasks.push(task);
            creator.save();
            res.status(201).json({ task });
            return;
        }
        else {
            return next(data);
        }
    }
    catch (err) {
        err.type = "bad request";
        next(err);
    }
});
exports.getAllTasks = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = data;
    try {
        if (!type) {
            const tasks = new APIFeatures(Task.find({}), req.query)
                .filter()
                .sort()
                .paginate();
            res.json(yield tasks.query);
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
exports.getTaskById = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, type } = data;
    const task_id = req.params.id;
    try {
        if (type) {
            next(data);
            return;
        }
        const task = yield Task.findById(task_id);
        // check if the task was created by the user requesting it
        if (!task.creator.equals(_id)) {
            let err = new Error();
            err.type = "unauthorized";
            next(err);
            return;
        }
        res.json(task);
        return;
    }
    catch (err) {
        next(err);
    }
});
exports.updateTask = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task_id = req.params.id;
    const { user, validInput, type } = data;
    try {
        // Data contains a type field only when returning an error
        if (!type) {
            // filter out the field(s) that are not undefined
            let filtered_input = {};
            let filtered_fields = Object.keys(validInput).filter((field) => validInput[field] !== undefined);
            filtered_fields.forEach((field) => filtered_input[field] = validInput[field]);
            const updatedTask = yield Task.findByIdAndUpdate({ _id: task_id }, { $set: filtered_input });
            if (updatedTask) {
                res.json({ message: "Task updated successfully" });
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
exports.deleteTask = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task_id = req.params.id;
    try {
        if (data.type) {
            next(data);
            return;
        }
        const task = yield Task.findById(task_id);
        let creator = yield User.findById(task.creator);
        let creator_tasks = creator.tasks;
        creator_tasks.forEach((id, index) => __awaiter(void 0, void 0, void 0, function* () { return id.equals(task._id) && delete creator_tasks[index]; }));
        a;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza3MuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy90YXNrcy5jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUN2RCxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDakQsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRWpELE9BQU8sQ0FBQyxVQUFVLEdBQUcsQ0FBTyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUcsRUFBRTtJQUNqRCxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsR0FBRyxJQUFJLENBQUM7SUFDdkMsSUFBRztRQUNDLDBEQUEwRDtRQUMxRCxJQUFHLENBQUMsSUFBSSxFQUFDO1lBQ0wsSUFBSSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QyxJQUFJLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLGlCQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxJQUFLLFVBQVUsRUFBRSxDQUFDO1lBQ3BFLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztZQUM3QixPQUFNO1NBQ1Q7YUFDRztZQUNBLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JCO0tBQ0o7SUFBQSxPQUFNLEdBQUcsRUFB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