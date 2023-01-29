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
exports.validateUpdateTask = exports.validateCreateTask = void 0;
const Joi = require("joi");
const taskSchema = Joi.object({
    title: Joi.string()
        .min(1)
        .max(255)
        .trim()
        .required(),
    description: Joi.string()
        .min(1)
        .max(255)
        .trim()
        .required(),
    tags: Joi.array()
        .items(Joi.string())
        .default([]),
    status: Joi.number()
        .default(1)
});
const updateTaskSchema = Joi.object({
    title: Joi.string()
        .min(1)
        .max(255)
        .trim(),
    description: Joi.string()
        .min(1)
        .max(255)
        .trim(),
    tags: Joi.array()
        .items(Joi.string()),
    status: Joi.number()
});
const validateCreateTask = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, tags } = req.body;
    try {
        if ("type" in data)
            return next(data);
        const user = data;
        const validInput = yield taskSchema.validateAsync({ title, description, tags });
        next({ user, validInput });
    }
    catch (err) {
        err.type = "bad request";
        next(err);
    }
});
exports.validateCreateTask = validateCreateTask;
const validateUpdateTask = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, tags } = req.body;
    try {
        if ("type" in data)
            return next(data);
        const user = data;
        const validInput = yield updateTaskSchema.validateAsync({ title, description, status, tags });
        next({ user, validInput });
    }
    catch (err) {
        err.type = "bad request";
        next(err);
    }
});
exports.validateUpdateTask = validateUpdateTask;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay52YWxpZGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWlkZGxld2FyZXMvdmFsaWRhdG9ycy90YXNrLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFJQSxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFM0IsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUMxQixLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtTQUNkLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDTixHQUFHLENBQUMsR0FBRyxDQUFDO1NBQ1IsSUFBSSxFQUFFO1NBQ04sUUFBUSxFQUFFO0lBQ2YsV0FBVyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7U0FDcEIsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNOLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDUixJQUFJLEVBQUU7U0FDTixRQUFRLEVBQUU7SUFDZixJQUFJLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRTtTQUNaLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbkIsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUNoQixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtTQUNmLE9BQU8sQ0FBQyxDQUFDLENBQUM7Q0FDbEIsQ0FBQyxDQUFBO0FBRUYsTUFBTSxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQ2hDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO1NBQ2QsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNOLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDUixJQUFJLEVBQUU7SUFDWCxXQUFXLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtTQUNwQixHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ04sR0FBRyxDQUFDLEdBQUcsQ0FBQztTQUNSLElBQUksRUFBRTtJQUNYLElBQUksRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFO1NBQ1osS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN4QixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtDQUN2QixDQUFDLENBQUE7QUFJSyxNQUFNLGtCQUFrQixHQUFHLENBQU0sSUFBb0IsRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUM3RyxNQUFNLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQzlDLElBQUc7UUFDQyxJQUFHLE1BQU0sSUFBSSxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2pCLE1BQU0sVUFBVSxHQUFHLE1BQU0sVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztLQUM1QjtJQUFBLE9BQU0sR0FBUSxFQUFDO1FBQ1osR0FBRyxDQUFDLElBQUksR0FBRyxhQUFhLENBQUE7UUFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2I7QUFDTCxDQUFDLENBQUEsQ0FBQTtBQVpZLFFBQUEsa0JBQWtCLHNCQVk5QjtBQUVNLE1BQU0sa0JBQWtCLEdBQUcsQ0FBTSxJQUFvQixFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ3pHLE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ3RELElBQUc7UUFDQyxJQUFHLE1BQU0sSUFBSSxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2pCLE1BQU0sVUFBVSxHQUFHLE1BQU0sZ0JBQWdCLENBQUMsYUFBYSxDQUFDLEVBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUM1RixJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztLQUM1QjtJQUFBLE9BQU0sR0FBUSxFQUFDO1FBQ1gsR0FBRyxDQUFDLElBQUksR0FBRyxhQUFhLENBQUE7UUFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2Q7QUFDVCxDQUFDLENBQUEsQ0FBQTtBQVpZLFFBQUEsa0JBQWtCLHNCQVk5QiJ9