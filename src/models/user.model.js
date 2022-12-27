const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
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

// Hash password before saving the database
userSchema.pre(
    "save",
    async function(next){
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next()
    }
)

userSchema.methods.isValidPassword = async function(input_password){
    return bcrypt.compare(input_password, this.password);
}

exports.User = model("User", userSchema)