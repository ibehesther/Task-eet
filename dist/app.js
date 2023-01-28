"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_route_js_1 = __importDefault(require("./routes/auth.route.js"));
const users_route_js_1 = __importDefault(require("./routes/users.route.js"));
const tasks_route_js_1 = __importDefault(require("./routes/tasks.route.js"));
const error_middleware_js_1 = require("./middlewares/error.middleware.js");
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const { DATABASE_CONN_STR } = process.env;
if (DATABASE_CONN_STR) {
    // Manage MongoDB connection
    mongoose_1.default.connect(DATABASE_CONN_STR, {
        // useNewUrlParser: true,
        autoIndex: true, //make this also true
    });
    mongoose_1.default.connection.on("connected", () => {
        console.log("Connected to MongoDB Successfully");
    });
    mongoose_1.default.connection.on("error", (err) => {
        console.log("An error occurred while connecting to MongoDB");
        console.log(err);
    });
}
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
const PORT = process.env.PORT || 8000;
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
// Apply the rate limiting middleware to all requests
app.use(limiter);
// Connect routers to express application
app.use("/api/v1.0", auth_route_js_1.default);
app.use("/api/v1.0/users", users_route_js_1.default);
app.use("/api/v1.0/tasks", tasks_route_js_1.default);
// // Middleware for handling different types of errors
app.use(error_middleware_js_1.errorHandler);
app.get("/api/v1.0", (req, res) => {
    res.send("Welcome to Task-eet API v1.0");
});
app.get("/", (req, res) => {
    res.redirect("/api/v1.0");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUErQztBQUMvQyx3REFBZ0M7QUFDaEMsZ0RBQXdCO0FBQ3hCLGtFQUFvQztBQUNwQyw0RUFBMkM7QUFDM0MsMkVBQWdEO0FBQ2hELDZFQUFpRDtBQUNqRCw2RUFBaUQ7QUFDakQsMkVBQWlFO0FBQ2pFLG9EQUE0QjtBQUM1QixvREFBMkI7QUFDM0IsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUdoQixNQUFNLEdBQUcsR0FBZ0IsSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFFbkMsTUFBTSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUUxQyxJQUFHLGlCQUFpQixFQUFDO0lBQ3BCLDRCQUE0QjtJQUM1QixrQkFBUSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRTtRQUNuQyx5QkFBeUI7UUFDekIsU0FBUyxFQUFFLElBQUksRUFBRSxxQkFBcUI7S0FDdEMsQ0FBQyxDQUFBO0lBRUYsa0JBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUU7UUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0lBQ2xELENBQUMsQ0FBQyxDQUFDO0lBRUgsa0JBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0NBQStDLENBQUMsQ0FBQztRQUM3RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQyxDQUFDO0NBRUg7QUFHRCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsY0FBSSxFQUFDLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQTtBQUM1QixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsdUJBQU8sR0FBRSxDQUFDLENBQUM7QUFDbkIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGdCQUFNLEdBQUUsQ0FBQyxDQUFDO0FBRWxCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztBQUV0QyxNQUFNLE9BQU8sR0FBRyxJQUFBLDRCQUFTLEVBQUM7SUFDekIsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSTtJQUN4QixHQUFHLEVBQUUsR0FBRztJQUNSLGVBQWUsRUFBRSxJQUFJO0lBQ3JCLGFBQWEsRUFBRSxLQUFLLEVBQUUsc0NBQXNDO0NBQzVELENBQUMsQ0FBQTtBQUVGLHFEQUFxRDtBQUNyRCxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBRWhCLHlDQUF5QztBQUN6QyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSx1QkFBVSxDQUFDLENBQUM7QUFDakMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSx3QkFBVSxDQUFDLENBQUM7QUFDdkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSx3QkFBVSxDQUFDLENBQUE7QUFFdEMsdURBQXVEO0FBQ3ZELEdBQUcsQ0FBQyxHQUFHLENBQUMsa0NBQVksQ0FBQyxDQUFBO0FBRXJCLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQzlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQTtBQUM1QyxDQUFDLENBQUMsQ0FBQTtBQUVGLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQ3RCLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDOUIsQ0FBQyxDQUFDLENBQUE7QUFFRixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNyRCxDQUFDLENBQUMsQ0FBQSJ9