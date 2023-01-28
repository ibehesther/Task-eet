"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(error, req, res, next) {
    const message = error.e_message || error.details && error.details[0].message;
    switch (error.type) {
        case "bad request":
            res.status(400).json({
                error: "Bad Request",
                statusCode: 400,
                message: message || "Request cannot be fulfilled due to bad syntax"
            });
            break;
        case "unauthenticated":
            res.status(401).json({
                error: "Unauthenticated",
                statusCode: 401,
                message: message || "User is not authenticated"
            });
            break;
        case "unauthorized":
            res.status(403).json({
                error: "Unauthorized",
                statusCode: 403,
                message: message || "User is not authorized to access resource(s)"
            });
            break;
        case "not found":
            res.status(404).json({
                error: "Not Found",
                statusCode: 404,
                message: message || "Resource(s) not found"
            });
            break;
        default:
            res.status(500).json({
                error: "Internal Server Error",
                statusCode: 500,
                message: message || "Server could not process request"
            });
            break;
    }
    next();
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlcy9lcnJvci5taWRkbGV3YXJlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLFNBQWdCLFlBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO0lBQ2hELE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtJQUM1RSxRQUFPLEtBQUssQ0FBQyxJQUFJLEVBQUM7UUFDZCxLQUFLLGFBQWE7WUFDaEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLEtBQUssRUFBRSxhQUFhO2dCQUNwQixVQUFVLEVBQUUsR0FBRztnQkFDZixPQUFPLEVBQUUsT0FBTyxJQUFJLCtDQUErQzthQUNwRSxDQUFDLENBQUE7WUFDRixNQUFNO1FBQ1IsS0FBSyxpQkFBaUI7WUFDcEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLEtBQUssRUFBRSxpQkFBaUI7Z0JBQ3hCLFVBQVUsRUFBRSxHQUFHO2dCQUNmLE9BQU8sRUFBRSxPQUFPLElBQUksMkJBQTJCO2FBQ2hELENBQUMsQ0FBQTtZQUNGLE1BQU07UUFDUixLQUFLLGNBQWM7WUFDakIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLEtBQUssRUFBRSxjQUFjO2dCQUNyQixVQUFVLEVBQUUsR0FBRztnQkFDZixPQUFPLEVBQUUsT0FBTyxJQUFJLDhDQUE4QzthQUNuRSxDQUFDLENBQUE7WUFDRixNQUFNO1FBQ1IsS0FBSyxXQUFXO1lBQ2QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLEtBQUssRUFBRSxXQUFXO2dCQUNsQixVQUFVLEVBQUUsR0FBRztnQkFDZixPQUFPLEVBQUUsT0FBTyxJQUFJLHVCQUF1QjthQUM1QyxDQUFDLENBQUE7WUFDRixNQUFNO1FBQ1I7WUFDRSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDbkIsS0FBSyxFQUFFLHVCQUF1QjtnQkFDOUIsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsT0FBTyxFQUFFLE9BQU8sSUFBSSxrQ0FBa0M7YUFDdkQsQ0FBQyxDQUFBO1lBQ0YsTUFBTTtLQUNUO0lBQ0QsSUFBSSxFQUFFLENBQUM7QUFDWCxDQUFDO0FBeENELG9DQXdDQyJ9