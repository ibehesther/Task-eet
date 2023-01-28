const APIFeatures = require("../../utils/apiFeatures");
const { Task } = require("../models/task.model");
const { User } = require("../models/user.model");

exports.createTask = async( data, req, res, next ) => {
    const { user, validInput, type} = data;
    try{
        // Data contains a type field only when returning an error
        if(!type){
            let creator = await User.findById(user._id);
            let task = await Task.create({creator: creator._id, ...validInput});
            creator.tasks.push(task);
            creator.save();
            res.status(201).json({task});
            return
        }
        else{
            return next(data);
        }
    }catch(err){
        err.type = "bad request"
        next(err);
    }
   
}

exports.getAllTasks = async(data, req, res, next) => {
    const { type } = data;
    try{
        if(!type){
            const tasks = new APIFeatures(Task.find({}), req.query)
                            .filter()
                            .sort()
                            .paginate();
            res.json(await tasks.query);
            return
        }else{
            next(data);
        }
    }catch(err) {
        next(err)
    }
    
}

exports.getTaskById = async(data, req, res, next) => {
    const { _id, type } = data;
    const task_id = req.params.id;
    try{
        if(type){
            next(data);
            return;
        }
        const task = await Task.findById(task_id);

        // check if the task was created by the user requesting it
        if(!task.creator.equals(_id)){
            let err = new Error();
            err.type = "unauthorized";
            next(err);
            return
        }
        res.json(task);
        return

    }catch(err) {
        next(err);
    }

}

exports.updateTask = async(data, req, res, next) => {
    const task_id = req.params.id;
    const { user, validInput, type } = data;
    try{
        // Data contains a type field only when returning an error
        if(!type){

            // filter out the field(s) that are not undefined
            let filtered_input = {}
            let filtered_fields = Object.keys(validInput).filter((field) => validInput[field] !== undefined)
            filtered_fields.forEach((field) => filtered_input[field] = validInput[field]);
            
            const updatedTask = await Task.findByIdAndUpdate({_id: task_id}, {$set: filtered_input});
            if(updatedTask){
                res.json({message: "Task updated successfully"})
                return;
            }
        }
        else{
            next(data);
        }
    }catch(err){
        next(err);
    }
}

exports.deleteTask = async(data, req, res, next) => {
    const task_id = req.params.id;

    try{
        if(data.type){
            next(data);
            return
        }
        const task = await Task.findById(task_id);
        let creator = await User.findById(task.creator);
        let creator_tasks = creator.tasks;
        creator_tasks.forEach(async(id, index) => id.equals(task._id) && delete creator_tasks[index])
        a
        creator.tasks = creator_tasks
        await creator.save();
        await task.delete();

        res.json({message: "Task deleted successfully"});
        return
    }catch(err){
        err.type="not found";
        next(err);
    }
}