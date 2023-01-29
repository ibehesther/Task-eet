import { NextFunction, Request, Response } from "express";
import { IError } from "../../types/middleware";
import { IUser } from "../../types/user";

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
}) 

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
}) 



export const validateCreateTask = async(data: IUser | IError, req: Request, res: Response, next: NextFunction) => {
    const { title, description, tags } = req.body;
    try{
        if("type" in data) return next(data);

        const user = data
        const validInput = await taskSchema.validateAsync({ title, description, tags });
        next({user, validInput});
    }catch(err: any){
        err.type = "bad request"
        next(err);
    }
}

export const validateUpdateTask = async(data: IUser | IError, req: Request, res: Response, next: NextFunction) => {
        const { title, description, status, tags } = req.body;
        try{
            if("type" in data) return next(data);

            const user = data
            const validInput = await updateTaskSchema.validateAsync({title, description, status, tags});
            next({user, validInput});
        }catch(err: any){
             err.type = "bad request"
             next(err);
        }
}