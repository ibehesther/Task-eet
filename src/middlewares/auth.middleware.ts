import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
import { Task } from "../models/task.model";
import { User }  from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import { IPayload, IUser } from "../types/user";
import { IError } from "../types/error";


const { JWT_SECRET } = process.env

// Ensure the user is authenticated
// i.e registered 
export const authenticateUser = async(req: Request, res: Response, next: NextFunction) => {
    const cookies= req.cookies;
    // check if the request has cookies
    if(!cookies){
        throw Error();
    }
    const token = cookies.access_token;
    try{
        const payload  = jwt.verify(token, JWT_SECRET as string) as any;
        const { _id, email } = payload;
        const user = await User.findOne({_id, email});
        if(!user){
            let error: IError = {type: "not found"};
            next(error);
            return;
        }
        next(user);
    }catch(error: any) {
        error.type="unauthenticated"
        next(error)
    }
}

export const authorizeUser = async(data: IUser | IError,  req: Request, res: Response, next: NextFunction) => {
    const task_id = req.params.id;
   
    try{
        if("type" in data) return next(data);

        const task = await Task.findById(task_id);
        if(!task){
            let error: IError = {type: "not found"};
            next(error);
            return;
        }

        // if logged in user is not the task creator
        let isUserTheCreator = data._id.equals(task.creator);
        if(!isUserTheCreator){
            let error = {type: "unauthorized"};
            next(error);
            return;
        }
        next(data);
    }catch(err: any){
        next(err);
    }
}