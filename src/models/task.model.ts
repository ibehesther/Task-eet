import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        unique: true,
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

export const Task = model("Task", taskSchema)