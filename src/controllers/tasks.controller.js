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
    let { limit=10, page=1, status=1, title, description, tags, sort="desc" } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);
    startPage = (page - 1) * limit;
    endPage = startPage + limit;
    const { type, _id} = data;

    const sort_format = (sort === "desc") ? -1 : 1;

    // check if user specifies title filter term
    // if yes, return an object useful for a case insensitive database query
    const search_title = title && {title: {$regex: title, $options: 'i'}};

    // check if user specifies description filter term
    // if yes, return an object useful for a case insensitive database query
    const search_desc = description && {description: {$regex: description, $options: 'i'}};

    // check if user specifies tag filter term
    // if yes, return an object with its value
    const search_tags = tags && {tags}
    try{
        if(!type){
            const tasks = await Task.find({creator: _id, status, ...search_title, ...search_desc, ...search_tags})
                                .sort({createdAt: sort_format})
                                .populate()
                                .all()
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
        const deletedTask = await Task.findByIdAndDelete(task_id);
        console.log(deletedTask)
        if(deletedTask) {
            res.json({message: "Task deleted successfully"});
            return
        }
        throw new Error();
    }catch(err){
        err.type="not found";
        next(err);
    }
}