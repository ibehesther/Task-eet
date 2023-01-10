const jwt = require("jsonwebtoken")
const { User } = require("../models/user.model");
require("dotenv").config()

const { JWT_SECRET } = process.env

const generateJWT= (data) => {
    const payload = {
        _id: data._id,
        email: data.email
    }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    return token;
}

exports.signupUser = async(message, req, res, next) => {
    try{
        if(!message.type){
            const user = await User.create({...message});
            const token = generateJWT(user);
            res.cookie("access_token", token, {
                sameSite: "Strict",
                maxAge: 86400000, //valid for 1 day
                httpOnly: true
            }).status(201).json({user});
            return
        }
        else{
            next(message)
        }
    }catch(err){
        err.type = "bad request"
        next(err);
    }
}

exports.signinUser = async(req, res, next) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email})
        const validPassword = await user.isValidPassword(password)
        if(!validPassword){
            let err = {}
            err.type="unauthenticated";
            err.e_message="Incorrect password, try again!"
            next(err)
            return
        }
        const token = generateJWT(user);
        res.cookie("access_token", token, {
            sameSite: "Strict",
            maxAge: 86400000, //valid for 1 day
            httpOnly: true
        }).json({user})
    } catch(err) {
        err.type = "not found";
        next(err)
    }
}

// Change password 
// When the previous password has been forgotten
exports.changePassword = async (req, res, next) => {

}

// Change password
// When the previous password has not been forgotten
exports.resetPassword = async(req, res, next) => {

}