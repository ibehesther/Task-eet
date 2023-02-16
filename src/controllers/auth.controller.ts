import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import dotenv from "dotenv";
dotenv.config();
import { env } from "process";
import { IUser } from "../types/user";
import { IUserData } from "../types/middleware";
import { NextFunction, Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { IError } from "../types/error";


const generateJWT= (data: IUser) => {
    const payload = {
        _id: data._id,
        email: data.email
    }
    const token = jwt.sign(payload, env.JWT_SECRET as string, { expiresIn: '1h' });
    return token;
}

export const signupUser = async(data: IUser | IError, req: Request, res: Response, next: NextFunction) => {
    try{
        console.log(data)
        if("type" in data) return next(data);

        const user: HydratedDocument<IUser> = await User.create({...data});
        const token = generateJWT(user);
        res.cookie("access_token", token, {
            sameSite: "strict",
            maxAge: 86400000, //valid for 1 day
            httpOnly: true
        }).status(201).json({user});
    }catch(err: any){
        err.type = "bad request"
        next(err);
    }
}

export const signinUser = async(req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try{
        const user  = await User.findOne({email});
        
        if(!user) throw Error();

        const validPassword = await user.isValidPassword(password);

        if(!validPassword){
            let err: IError = {
                type: "unauthenticated",
                e_message: "Incorrect password, try again!"
            }
            next(err);
            return
        }
        const token = generateJWT(user);
        res.cookie("access_token", token, {
            sameSite: "strict",
            maxAge: 86400000, //valid for 1 day
            httpOnly: true
        }).json({user})
    } catch(err: any) {
        err.type = "not found";
        next(err)
    }
}

// Change password 
// When the previous password has not been forgotten
export const changePassword = async (data : IUserData | IError, req: Request, res: Response, next: NextFunction) => {
    try{
        if("type" in data){
            next(data);
            return
        }
        const { user, validInput } = data;
        const { password, new_password } = validInput;

        if( !user || !password || !new_password) throw Error();

        const validPassword = await user.isValidPassword(password);

        if(!validPassword){
            let error: IError = {type: "unauthenticated"};
            next(error);
            return;
        }

        user.password = new_password;
        await user.save();
        res.json({message: "Password has been updated"})
    } catch(err) {
        next(err);
    }
}

// Change password
// When the previous password has been forgotten
export const resetPassword = async(req: Request, res: Response, next: NextFunction) => {

}

// Logout user
export const logout = async (data: IUser | IError, req: Request, res: Response, next: NextFunction) => {
    try{
        if("type" in data){
            return next(data);
        }
        res.clearCookie("access_token")
            .json({message: "Logout successful"});
        return;
    }catch(err){
        next(err);
    }
}