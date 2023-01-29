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
exports.logout = exports.resetPassword = exports.changePassword = exports.signinUser = exports.signupUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const process_1 = require("process");
const generateJWT = (data) => {
    const payload = {
        _id: data._id,
        email: data.email
    };
    const token = jsonwebtoken_1.default.sign(payload, process_1.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};
const signupUser = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ("type" in data) {
            next(data);
            return;
        }
        const user = yield user_model_1.User.create(Object.assign({}, data));
        const token = generateJWT(user);
        res.cookie("access_token", token, {
            sameSite: "strict",
            maxAge: 86400000,
            httpOnly: true
        }).status(201).json({ user });
    }
    catch (err) {
        err.type = "bad request";
        next(err);
    }
});
exports.signupUser = signupUser;
const signinUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_model_1.User.findOne({ email });
        if (!user)
            throw Error();
        const validPassword = yield user.isValidPassword(password);
        if (!validPassword) {
            let err = {
                type: "unauthenticated",
                e_message: "Incorrect password, try again!"
            };
            next(err);
            return;
        }
        const token = generateJWT(user);
        res.cookie("access_token", token, {
            sameSite: "strict",
            maxAge: 86400000,
            httpOnly: true
        }).json({ user });
    }
    catch (err) {
        err.type = "not found";
        next(err);
    }
});
exports.signinUser = signinUser;
// Change password 
// When the previous password has not been forgotten
const changePassword = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ("type" in data) {
            next(data);
            return;
        }
        const { user, validInput } = data;
        const { password, new_password } = validInput;
        if (!user || !password || !new_password)
            throw Error();
        const validPassword = yield user.isValidPassword(password);
        if (!validPassword) {
            let error = { type: "unauthenticated" };
            next(error);
            return;
        }
        user.password = new_password;
        yield user.save();
        res.json({ message: "Password has been updated" });
    }
    catch (err) {
        next(err);
    }
});
exports.changePassword = changePassword;
// Change password
// When the previous password has been forgotten
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.resetPassword = resetPassword;
// Logout user
const logout = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ("type" in data) {
            return next(data);
        }
        res.clearCookie("access_token")
            .json({ message: "Logout successful" });
        return;
    }
    catch (err) {
        next(err);
    }
});
exports.logout = logout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2F1dGguY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnRUFBK0I7QUFDL0IscURBQTRDO0FBQzVDLG9EQUE0QjtBQUM1QixnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2hCLHFDQUE4QjtBQU85QixNQUFNLFdBQVcsR0FBRSxDQUFDLElBQVcsRUFBRSxFQUFFO0lBQy9CLE1BQU0sT0FBTyxHQUFHO1FBQ1osR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1FBQ2IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO0tBQ3BCLENBQUE7SUFDRCxNQUFNLEtBQUssR0FBRyxzQkFBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsYUFBRyxDQUFDLFVBQW9CLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMvRSxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDLENBQUE7QUFFTSxNQUFNLFVBQVUsR0FBRyxDQUFNLElBQW9CLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDckcsSUFBRztRQUNDLElBQUcsTUFBTSxJQUFJLElBQUksRUFBQztZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNYLE9BQU87U0FFVjtRQUNELE1BQU0sSUFBSSxHQUE0QixNQUFNLGlCQUFJLENBQUMsTUFBTSxtQkFBSyxJQUFJLEVBQUUsQ0FBQztRQUNuRSxNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsS0FBSyxFQUFFO1lBQzlCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLFFBQVEsRUFBRSxJQUFJO1NBQ2pCLENBQUMsQ0FB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