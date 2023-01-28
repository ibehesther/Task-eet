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
const { User } = require("../models/user.model");
require("dotenv").config();
const { JWT_SECRET } = process.env;
const generateJWT = (data) => {
    const payload = {
        _id: data._id,
        email: data.email
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    return token;
};
exports.signupUser = (message, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!message.type) {
            const user = yield User.create(Object.assign({}, message));
            const token = generateJWT(user);
            res.cookie("access_token", token, {
                sameSite: "Strict",
                maxAge: 86400000,
                httpOnly: true
            }).status(201).json({ user });
            return;
        }
        else {
            next(message);
        }
    }
    catch (err) {
        err.type = "bad request";
        next(err);
    }
});
exports.signinUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User.findOne({ email });
        const validPassword = yield user.isValidPassword(password);
        if (!validPassword) {
            let err = {};
            err.type = "unauthenticated";
            err.e_message = "Incorrect password, try again!";
            next(err);
            return;
        }
        const token = generateJWT(user);
        res.cookie("access_token", token, {
            sameSite: "Strict",
            maxAge: 86400000,
            httpOnly: true
        }).json({ user });
    }
    catch (err) {
        err.type = "not found";
        next(err);
    }
});
// Change password 
// When the previous password has not been forgotten
exports.changePassword = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (data.type) {
            next(data);
            return;
        }
        const { user, validInput } = data;
        const { password, new_password } = validInput;
        const validPassword = yield user.isValidPassword(password);
        if (!validPassword) {
            let error = new Error();
            error.type = "unauthenticated";
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
// Change password
// When the previous password has been forgotten
exports.resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
});
// Logout user
exports.logout = (data, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (data.type) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2F1dGguY29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFBO0FBQ25DLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNqRCxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7QUFFMUIsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUE7QUFFbEMsTUFBTSxXQUFXLEdBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUN4QixNQUFNLE9BQU8sR0FBRztRQUNaLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztRQUNiLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztLQUNwQixDQUFBO0lBQ0QsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDakUsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyxDQUFBO0FBRUQsT0FBTyxDQUFDLFVBQVUsR0FBRyxDQUFNLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ2xELElBQUc7UUFDQyxJQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQztZQUNiLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sbUJBQUssT0FBTyxFQUFFLENBQUM7WUFDN0MsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLEtBQUssRUFBRTtnQkFDOUIsUUFBUSxFQUFF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