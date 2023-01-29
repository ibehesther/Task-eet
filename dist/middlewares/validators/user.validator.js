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
exports.validateChangePassword = exports.validateUpdateUser = exports.validateCreateUser = void 0;
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    first_name: joi_1.default.string()
        .min(3)
        .max(255)
        .trim()
        .required(),
    last_name: joi_1.default.string()
        .min(3)
        .max(255)
        .trim()
        .required(),
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    password: joi_1.default.string()
        .required(),
    tasks: joi_1.default.array()
        .items(joi_1.default.string())
        .default([])
});
const updateUserSchema = joi_1.default.object({
    first_name: joi_1.default.string()
        .min(3)
        .max(255)
        .trim(),
    last_name: joi_1.default.string()
        .min(3)
        .max(255)
        .trim(),
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
});
const changePasswordSchema = joi_1.default.object({
    password: joi_1.default.string()
        .required(),
    new_password: joi_1.default.string()
        .disallow(joi_1.default.ref('password'))
        .required()
        .messages({
        'any.invalid': `new_password cannot have the same value as password`
    })
});
const validateCreateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.validateCreateUser = validateCreateUser;
const validateUpdateUser = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, email } = req.body;
    try {
        if ("type" in data) {
            next(data);
            return;
        }
        const user = data;
        const validInput = yield updateUserSchema.validateAsync({ first_name, last_name, email });
        next({ user, validInput });
    }
    catch (err) {
        err.type = "bad request";
        next(err);
    }
});
exports.validateUpdateUser = validateUpdateUser;
const validateChangePassword = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, new_password } = req.body;
    try {
        if ("type" in data) {
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
exports.validateChangePassword = validateChangePassword;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci52YWxpZGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWlkZGxld2FyZXMvdmFsaWRhdG9ycy91c2VyLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBc0I7QUFLdEIsTUFBTSxVQUFVLEdBQUcsYUFBRyxDQUFDLE1BQU0sQ0FBQztJQUMxQixVQUFVLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRTtTQUNuQixHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ04sR0FBRyxDQUFDLEdBQUcsQ0FBQztTQUNSLElBQUksRUFBRTtTQUNOLFFBQVEsRUFBRTtJQUNmLFNBQVMsRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFO1NBQ2xCLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDTixHQUFHLENBQUMsR0FBRyxDQUFDO1NBQ1IsSUFBSSxFQUFFO1NBQ04sUUFBUSxFQUFFO0lBQ2YsS0FBSyxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUU7U0FDZCxLQUFLLENBQUMsRUFBQyxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFDLEVBQUMsQ0FBQztTQUM3RCxRQUFRLEVBQUU7SUFDZixRQUFRLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRTtTQUNqQixRQUFRLEVBQUU7SUFDZixLQUFLLEVBQUUsYUFBRyxDQUFDLEtBQUssRUFBRTtTQUNiLEtBQUssQ0FBQyxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbkIsT0FBTyxDQUFDLEVBQUUsQ0FBQztDQUNuQixDQUFDLENBQUE7QUFFRixNQUFNLGdCQUFnQixHQUFHLGFBQUcsQ0FBQyxNQUFNLENBQUM7SUFDaEMsVUFBVSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUU7U0FDbkIsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNOLEdBQUcsQ0FBQyxHQUFHLENB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