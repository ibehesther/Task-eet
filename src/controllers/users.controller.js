const { User } = require("../models/user.model");


exports.updateUser = async(data, req, res, next) => {
    const { data: user, validInput, type } = data;
    try{
        // Data contains a type field only when returning a Joi error
        if(!type){
            let filtered_input = {}
            let filtered_fields = Object.keys(validInput).filter((field) => validInput[field] !== undefined)
            filtered_fields.forEach((field) => filtered_input[field] = validInput[field]);
            
            const updatedUser = await User.findByIdAndUpdate({_id: user._id}, {$set: filtered_input});
            if(updatedUser){
                res.json({message: "User updated successfully"})
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

exports.deleteUser = (data, req, res, next) => {
    
}