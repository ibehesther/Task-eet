import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types/user";

const userSchema = new Schema<IUser>({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }, 
    password: {
        type: String,
        required: true
    }, 
    tasks: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: "Task"
    }]
})

// Hash password before saving in the database
userSchema.pre(
    "save",
    async function(next){
        if (!this.isModified('password')) {
            next();
            return;
        }
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next()
    }
)

// Compare input password with password in database
userSchema.methods.isValidPassword = async function(input_password: string): Promise<Boolean>{
    return await bcrypt.compare(input_password, this.password);
}

export const User = model<IUser>("User", userSchema)