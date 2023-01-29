"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
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
            type: mongoose_1.Schema.Types.ObjectId,
            default: [],
            ref: "Task"
        }]
});
// Hash password before saving in the database
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            next();
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    });
});
// Compare input password with password in database
userSchema.methods.isValidPassword = function (input_password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(input_password, this.password);
    });
};
exports.User = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdXNlci5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBeUM7QUFDekMsb0RBQTRCO0FBRzVCLE1BQU0sVUFBVSxHQUFHLElBQUksaUJBQU0sQ0FBUTtJQUNqQyxVQUFVLEVBQUU7UUFDUixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxNQUFNO1FBQ1osTUFBTSxFQUFFLElBQUk7UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxLQUFLLEVBQUUsQ0FBQztZQUNKLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLE9BQU8sRUFBRSxFQUFFO1lBQ1gsR0FBRyxFQUFFLE1BQU07U0FDZCxDQUFDO0NBQ0wsQ0FBQyxDQUFBO0FBRUYsOENBQThDO0FBQzlDLFVBQVUsQ0FBQyxHQUFHLENBQ1YsTUFBTSxFQUNOLFVBQWUsSUFBSTs7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM5QixJQUFJLEVBQUUsQ0FBQztZQUNQLE9BQU87U0FDVjtRQUNELE1BQU0sY0FBYyxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQztRQUMvQixJQUFJLEVBQUUsQ0FBQTtJQUNWLENBQUM7Q0FBQSxDQUNKLENBQUE7QUFFRCxtREFBbUQ7QUFDbkQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEdBQUcsVUFBZSxjQUFzQjs7UUFDdEUsT0FBTyxNQUFNLGdCQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUFBLENBQUE7QUFFWSxRQUFBLElBQUksR0FBRyxJQUFBLGdCQUFLLEVBQVEsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFBIn0=