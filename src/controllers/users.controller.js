const { User } = require("../models/user.model");


exports.updateUser = async(data, req, res, next) => {
    const { user, validInput, type } = data;
    try{
        // Data contains a type field only when returning an error
        if(!type){
            // filter out the field(s) that are not undefined
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

exports.deleteUser = async(data, req, res, next) => {
    try{
        // Data contains a type field only when returning an error
        if(!data.type){
            const deletedUser = await User.findByIdAndDelete(data._id);

            if(deletedUser){
                res.clearCookie("access_token")
                .json({message: "User deleted successfully"});
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