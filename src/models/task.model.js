const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: true
    }],
    status: {
        type: Number,
        default: 1
    }
}, {timestamps: true})

exports.Task = model("Task", taskSchema)