const { Task } = require("../models/task.model");
const { User } = require("../models/user.model");

exports.createTask = async( data, req, res, next ) => {
    const { user, validInput, type} = data;
    try{
        // Data contains a type field only when returning an error
        if(!type){
            let creator = await User.findById(user._id)
            const task = await Task.create({creator: user._id,...validInput});
            creator.tasks.push(task)
            creator.save();
            res.status(201).json({task});
        }
        else{
            next(data);
        }
    }catch(err){
        err.type = "bad request"
        next(err);
    }
   
}

exports.getAllTasks = async(data, req, res, next) => {
    let { limit=10, page=1, status=1, title="Grocer", description="" } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);
    startPage = (page - 1) * limit;
    endPage = startPage + limit;
    const { type, _id} = data;
    try{
        if(!type){
            const tasks = await Task.find({creator: _id, status}).populate().all()
                                .limit(limit).skip((page-1) * limit);
            res.json({tasks});
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
    const { user, validInput, type } = data;
    // try{
    //     // Data contains a type field only when returning an error
    //     if(!type){
    //         let filtered_input = {}
    //         let filtered_fields = Object.keys(validInput).filter((field) => validInput[field] !== undefined)
    //         filtered_fields.forEach((field) => filtered_input[field] = validInput[field]);
            
    //         const updatedUser = await User.findByIdAndUpdate({_id: user._id}, {$set: filtered_input});
    //         if(updatedUser){
    //             res.json({message: "User updated successfully"})
    //             return;
    //         }
    //     }
    //     else{
    //         next(data);
    //     }
    // }catch(err){
    //     next(err);
    // }
}

exports.deleteTask = (data, req, res, next) => {
    
}