import Joi from "joi";
import { Request, Response, NextFunction } from 'express';
import { IUser } from "../../types/user";
import { Error } from "../../types/middleware";

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
        .email({minDomainSegments: 2, tlds: { allow: ["com", "net"]}})
        .required(),
    password: Joi.string()
        .required(),
    tasks: Joi.array()
        .items(Joi.string())
        .default([])
}) 

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
        .email({minDomainSegments: 2, tlds: { allow: ["com", "net"]}})
    }) 

const changePasswordSchema = Joi.object({
    password: Joi.string()
        .required(),
    new_password: Joi.string()
        .disallow(Joi.ref('password'))
        .required()
        .messages({
            'any.invalid': `new_password cannot have the same value as password`
          })
}) 
    


export const validateCreateUser = async(req: Request, res: Response, next: NextFunction) => {
    const { first_name, last_name, email, password, tasks } = req.body;
    try{
        const validInput = await userSchema.validateAsync({first_name, last_name, email, password, tasks});
        next(validInput);
    }catch(err: any){
        err.type = "bad request"
        next(err);
    }
}

export const validateUpdateUser = async(data: IUser | Error, req: Request, res: Response, next: NextFunction) => {
        const { first_name, last_name, email } = req.body;
        try{
             if(typeof data === "object" && data instanceof Error){
                next(data);
                return;
             }
             const user = data
             const validInput = await updateUserSchema.validateAsync({first_name, last_name, email});
             next({user, validInput});
        }catch (err: any){
             err.type = "bad request"
             next(err);
        }
}

export const validateChangePassword = async(data: IUser | Error, req: Request, res: Response, next: NextFunction) => {
    const { password, new_password } = req.body;
    try{
        if(typeof data === "object" && data instanceof Error ){
            next(data);
            return;
        }
        const validInput = await changePasswordSchema.validateAsync({password, new_password});
        next({user: data, validInput});
    }catch(err: any){
        err.type = "bad request"
        next(err);
    }
}