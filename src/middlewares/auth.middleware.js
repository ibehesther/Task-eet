const jwt = require("jsonwebtoken");
const { Task } = require("../models/task.model");
const User  = require("../models/user.model");
require("dotenv").config()

const { JWT_SECRET } = process.env

// Ensure the user is authenticated
// i.e registered 
export const authenticateUser = async(req, res, next) => {
    const cookies= req.cookies;
    // check if the request has cookies
    if(!cookies){
        throw Error();
    }
    const token = cookies.access_token;
    try{
        const payload = jwt.verify(token, JWT_SECRET);
        const { _id, email } = payload;
        const user = await User.findOne({_id, email});
        if(!user){
            let error = {};
            error.type = "not found"
            next(error)
        }
        next(user);
    }catch(err) {
        let error = {}
        error.type="unauthenticated"
        next(error)
    }
}

export const authorizeUser = async(data,  req, res, next) => {
    const task_id = req.params.id;
   
    try{
        if(data.type){
            next(data);
            return;
        }
        const task = await Task.findById(task_id);
        if(!task){
            let error = new Error();
            error.type = "bad request";
            next(error);
            return;
        }

        // return unauthorized error
        // if logged in user is not the task creator
        isUserTheCreator = data._id.equals(task.creator);
        if(!isUserTheCreator){
            let error = new Error();
            error.type = "unauthorized";
            next(error);
            return;
        }
        next(data);
    }catch(err){
        next(err);
    }
}