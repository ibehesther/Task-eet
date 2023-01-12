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
    


exports.validateCreateUser = async(req, res, next) => {
    const { first_name, last_name, email, password, tasks } = req.body;
    try{
        const validInput = await userSchema.validateAsync({first_name, last_name, email, password, tasks});
        next(validInput);
    }catch(err){
        err.type = "bad request"
        next(err);
    }
}

exports.validateUpdateUser = async(data, req, res, next) => {
        const { first_name, last_name, email } = req.body;
        try{
             if(!data.type){
                const user = data
                const validInput = await updateUserSchema.validateAsync({first_name, last_name, email});
                next({user, validInput});
                return
             }
             next(data);
        }catch(err){
             err.type = "bad request"
             next(err);
        }
}

exports.validateChangePassword = async(data, req, res, next) => {
    const { type } = data;
    const { password, new_password } = req.body;
    try{
        if(type){
            next(data);
            return;
        }
        const validInput = await changePasswordSchema.validateAsync({password, new_password});
        next({user: data, validInput});
    }catch(err){
        err.type = "bad request"
        next(err);
    }
}