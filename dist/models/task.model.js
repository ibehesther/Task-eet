"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, { timestamps: true });
exports.Task = (0, mongoose_1.model)("Task", taskSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdGFzay5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1Q0FBeUM7QUFFekMsTUFBTSxVQUFVLEdBQUcsSUFBSSxpQkFBTSxDQUFDO0lBQzFCLE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1FBQzNCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsR0FBRyxFQUFFLE1BQU07S0FDZDtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxNQUFNO1FBQ1osTUFBTSxFQUFFLElBQUk7UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELFdBQVcsRUFBRTtRQUNULElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxJQUFJLEVBQUUsQ0FBQztZQUNILElBQUksRUFBRSxNQUFNO1lBQ1osUUFBUSxFQUFFLElBQUk7U0FDakIsQ0FBQztJQUNGLE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLENBQUM7S0FDYjtDQUNKLEVBQUUsRUFBQyxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtBQUVULFFBQUEsSUFBSSxHQUFHLElBQUEsZ0JBQUssRUFBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUEifQ==