import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { Task } from "../models/task.model";
import { User } from "../models/user.model";
import { IError } from "../types/error";
import { IInput, IUserData } from "../types/middleware";
import { IUser } from "../types/user";

function instanceOfIInput(object: any): object is IInput {
    return 'first_name' in object || 'last_name' in object || 'email' in object ||
    'password' in object || 'new_password' in object || 'tasks' in object;
}

export const updateUser = async(data: IUserData | IError, req: Request, res: Response, next: NextFunction) => {
    try{
        // Data contains a type field only when returning an error
        if("type" in data) return next(data);

        const { user, validInput } = data;

        // filter out the field(s) that are not undefined
        const filtered_input = Object.fromEntries(
            Object.entries(validInput).filter(([key, value]) => value !== undefined)
          );
        const updatedUser = await User.findByIdAndUpdate({_id: user._id}, {$set: filtered_input});
        if(updatedUser){
            res.json({message: "User updated successfully"})
            return;
        }
    }catch(err: any){
        next(err);
    }
}

export const deleteUser = async(data: IUser | IError, req: Request, res: Response, next: NextFunction) => {
    try{
        // Data contains a type field only when returning an error
        if("type" in data) return next(data);

        let user = await User.findById(data._id);

        if (!user) throw Error();

        // delete all the tasks created by the user
        user.tasks.forEach(async(id) => await Task.findByIdAndDelete(id));
        await user.delete();

        // remove the cookie from cookie storage
        res.clearCookie("access_token")
            .json({message: "User deleted successfully"});
    }catch(err){
        next(err);
    }
}