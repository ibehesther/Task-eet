import APIFeatures from "../utils/apiFeatures";
import { Task } from "../models/task.model";
import { User } from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import { IUserData } from "../types/middleware";
import { IUser } from "../types/user";
import { IError } from "../types/error";

export const createTask = async( data: IUserData | IError, req: Request, res: Response, next: NextFunction ) => {
   
    try{
        // Data contains a type field only when returning an error
        if("type" in data) return next(data);
        
        let { user, validInput } = data;
        let creator = await User.findById(user._id);

        if(!creator) throw Error();

        let task = await Task.create({creator: creator._id, ...validInput});
        
        if(!task) throw Error();

        creator.tasks.push(task._id);
        creator.save();
        res.status(201).json({task});
    }catch(err: any){
        err.type = "bad request"
        next(err);
    }
   
}

export const getAllTasks = async(data: IUser | IError, req: Request, res: Response, next: NextFunction ) => {

    try{
        if("type" in data) return next(data);

        const tasks = new APIFeatures(Task.find({}), req.query)
                            .filter()
                            .sort()
                            .paginate();
            res.json(await tasks.query);
    }catch(err) {
        next(err)
    }
    
}

export const getTaskById = async(data: IUser | IError, req: Request, res: Response, next: NextFunction ) => {
    const task_id = req.params.id;
    try{
        if("type" in data) return next(data);

        const task = await Task.findById(task_id);

        if(!task) throw Error();

        // check if the task was created by the user requesting it
        if(!task.creator.equals(data._id)){
            let err: IError = {type: "unauthorized"};
            next(err);
            return
        }
        res.json(task);
        return

    }catch(err: any) {
        err.type="not found"
        next(err);
    }

}

export const updateTask = async(data: IUserData | IError, req: Request, res: Response, next: NextFunction ) => {
    const task_id = req.params.id;
    try{
        // Data contains a type field only when returning an error
        if("type" in data) return next(data);

        const {  validInput } = data;

        const filtered_input = Object.fromEntries(
            Object.entries(validInput).filter(([key, value]) => value !== undefined)
          );

        const updatedTask = await Task.findByIdAndUpdate({_id: task_id}, {$set: filtered_input});
        if(!updatedTask) throw Error();

        res.json({message: "Task updated successfully"})
    }catch(err: any){
        err.type="not found"
        next(err);
    }
}

export const deleteTask = async(data: IUser | IError, req: Request, res: Response, next: NextFunction ) => {
    const task_id = req.params.id;

    try{
        if("type" in data) return next(data);

        const task = await Task.findById(task_id);

        if(!task) throw Error();

        let creator = await User.findById(task.creator);

        if(!creator) throw Error();

        let creator_tasks = creator.tasks;
        creator_tasks.forEach(async(id, index) => id.equals(task._id) && delete creator_tasks[index])
        creator.tasks = creator_tasks
        await creator.save();
        await task.delete();

        res.json({message: "Task deleted successfully"});
        return
    }catch(err: any){
        err.type="not found";
        next(err);
    }
}