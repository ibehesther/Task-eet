const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
require("dotenv").config()

const { JWT_SECRET } = process.env

exports.validateUser = async(req, res, next) => {
    const cookies= req.cookies;
    // check if the request has cookies
    if(!cookies){
        let error ={};
        err.type="unauthenticated"
        next(error)
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
        error.type="unauthorized"
        next(error)
    }
}