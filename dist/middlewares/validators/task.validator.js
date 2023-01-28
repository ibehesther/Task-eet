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
exports.validateCreateTask = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, tags } = req.body;
    try {
        if (!data.type) {
            const user = data;
            const validInput = yield taskSchema.validateAsync({ title, description, tags });
            next({ user, validInput });
            return;
        }
        next(data);
        return;
    }
    catch (err) {
        err.type = "bad request";
        next(err);
    }
});
exports.validateUpdateTask = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, tags } = req.body;
    try {
        if (!data.type) {
            const user = data;
            const validInput = yield updateTaskSchema.validateAsync({ title, description, status, tags });
            next({ user, validInput });
            return;
        }
        next(data);
        return;
    }
    catch (err) {
        err.type = "bad request";
        next(err);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay52YWxpZGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWlkZGxld2FyZXMvdmFsaWRhdG9ycy90YXNrLnZhbGlkYXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRTNCLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDMUIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7U0FDZCxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ04sR0FBRyxDQUFDLEdBQUcsQ0FBQztTQUNSLElBQUksRUFBRTtTQUNOLFFBQVEsRUFBRTtJQUNmLFdBQVcsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO1NBQ3BCLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDTixHQUFHLENBQUMsR0FBRyxDQUFDO1NBQ1IsSUFBSSxFQUFFO1NBQ04sUUFBUSxFQUFFO0lBQ2YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUU7U0FDWixLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ25CLE9BQU8sQ0FBQyxFQUFFLENBQUM7SUFDaEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7U0FDZixPQUFPLENBQUMsQ0FBQyxDQUFDO0NBQ2xCLENBQUMsQ0FBQTtBQUVGLE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUNoQyxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtTQUNkLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDTixHQUFHLENBQUMsR0FBRyxDQUFDO1NBQ1IsSUFBSSxFQUFFO0lBQ1gsV0FBVyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7U0FDcEIsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNOLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDUixJQUFJLEVBQUU7SUFDWCxJQUFJLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRTtTQUNaLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDeEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7Q0FDdkIsQ0FBQyxDQUFBO0FBSUYsT0FBTyxDQUFDLGtCQUFrQixHQUFHLENBQU0sSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDdkQsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUM5QyxJQUFHO1FBQ0MsSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUM7WUFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUE7WUFDakIsTUFBTSxVQUFVLEdBQUcsTUFBTSxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2hGLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO1lBQ3pCLE9BQU07U0FDVDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNYLE9BQU07S0FDVDtJQUFBLE9BQU0sR0FBRyxFQUFDO1FBQ1AsR0FBRyxDQUFDLElBQUksR0FBRyxhQUFhLENBQUE7UUFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2I7QUFDTCxDQUFDLENBQUEsQ0FBQTtBQUVELE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxDQUFNLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ25ELE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ3RELElBQUc7UUFDRSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQztZQUNYLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQTtZQUNqQixNQUFNLFVBQVUsR0FBRyxNQUFNLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxFQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7WUFDNUYsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7WUFDekIsT0FBTTtTQUNSO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1gsT0FBTTtLQUNUO0lBQUEsT0FBTSxHQUFHLEVBQUM7UUFDTixHQUFHLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQTtRQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDZDtBQUNULENBQUMsQ0FBQSxDQUFBIn0=