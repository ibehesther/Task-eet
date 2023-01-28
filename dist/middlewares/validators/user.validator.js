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
const userSchema = Joi.object({
    first_name: Joi.string()
        .min(3)
        .max(255)
        .trim()
        .required(),
    last_name: Joi.string()
        .min(3)
        .max(255)
        .trim()
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    password: Joi.string()
        .required(),
    tasks: Joi.array()
        .items(Joi.string())
        .default([])
});
const updateUserSchema = Joi.object({
    first_name: Joi.string()
        .min(3)
        .max(255)
        .trim(),
    last_name: Joi.string()
        .min(3)
        .max(255)
        .trim(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
});
const changePasswordSchema = Joi.object({
    password: Joi.string()
        .required(),
    new_password: Joi.string()
        .disallow(Joi.ref('password'))
        .required()
        .messages({
        'any.invalid': `new_password cannot have the same value as password`
    })
});
exports.validateCreateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, email, password, tasks } = req.body;
    try {
        const validInput = yield userSchema.validateAsync({ first_name, last_name, email, password, tasks });
        next(validInput);
    }
    catch (err) {
        err.type = "bad request";
        next(err);
    }
});
exports.validateUpdateUser = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, email } = req.body;
    try {
        if (!data.type) {
            const user = data;
            const validInput = yield updateUserSchema.validateAsync({ first_name, last_name, email });
            next({ user, validInput });
            return;
        }
        next(data);
    }
    catch (err) {
        err.type = "bad request";
        next(err);
    }
});
exports.validateChangePassword = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = data;
    const { password, new_password } = req.body;
    try {
        if (type) {
            next(data);
            return;
        }
        const validInput = yield changePasswordSchema.validateAsync({ password, new_password });
        next({ user: data, validInput });
    }
    catch (err) {
        err.type = "bad request";
        next(err);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci52YWxpZGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWlkZGxld2FyZXMvdmFsaWRhdG9ycy91c2VyLnZhbGlkYXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRTNCLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDMUIsVUFBVSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7U0FDbkIsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNOLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDUixJQUFJLEVBQUU7U0FDTixRQUFRLEVBQUU7SUFDZixTQUFTLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtTQUNsQixHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ04sR0FBRyxDQUFDLEdBQUcsQ0FBQztTQUNSLElBQUksRUFBRTtTQUNOLFFBQVEsRUFBRTtJQUNmLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO1NBQ2QsS0FBSyxDQUFDLEVBQUMsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBQyxFQUFDLENBQUM7U0FDN0QsUUFBUSxFQUFFO0lBQ2YsUUFBUSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7U0FDakIsUUFBUSxFQUFFO0lBQ2YsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUU7U0FDYixLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ25CLE9BQU8sQ0FBQyxFQUFFLENBQUM7Q0FDbkIsQ0FBQyxDQUFBO0FBRUYsTUFBTSxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQ2hDLFVBQVUsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO1NBQ25CLEdBQUcsQ0FBQyxDQUFD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