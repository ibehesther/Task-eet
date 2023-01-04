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



exports.validateCreateTask = async(data, req, res, next) => {
    const { title, description, tags } = req.body;
    try{
        if(!data.type){
            const user = data
            const validInput = await taskSchema.validateAsync({ title, description, tags });
            next({user, validInput});
            return
        }
        next(data);
        return
    }catch(err){
        err.type = "bad request"
        next(err);
    }
}

exports.validateUpdateTask = async(data, req, res, next) => {
        const { title, description, status, tags } = req.body;
        try{
             if(!data.type){
                const user = data
                const validInput = await updateTaskSchema.validateAsync({title, description, status, tags});
                next({user, validInput});
                return
             }
            next(data);
            return
        }catch(err){
             err.type = "bad request"
             next(err);
        }
}