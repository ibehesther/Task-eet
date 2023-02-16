"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const express_1 = require("express");
const middleware_1 = require("../types/middleware");
function errorHandler(error, req, res, next) {
    const message = error.e_message || error.details && error.details[0] && error.details[0].message;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlcy9lcnJvci5taWRkbGV3YXJlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUEwRDtBQUMxRCxvREFBNkM7QUFFN0MsU0FBZ0IsWUFBWSxDQUFDLEtBQWEsRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO0lBQ3pGLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFBO0lBQ2hHLFFBQU8sS0FBSyxDQUFDLElBQUksRUFBQztRQUNkLEtBQUssYUFBYTtZQUNoQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDbkIsS0FBSyxFQUFFLGFBQWE7Z0JBQ3BCLFVBQVUsRUFBRSxHQUFHO2dCQUNmLE9BQU8sRUFBRSxPQUFPLElBQUksK0NBQStDO2FBQ3BFLENBQUMsQ0FBQTtZQUNGLE1BQU07UUFDUixLQUFLLGlCQUFpQjtZQUNwQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDbkIsS0FBSyxFQUFFLGlCQUFpQjtnQkFDeEIsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsT0FBTyxFQUFFLE9BQU8sSUFBSSwyQkFBMkI7YUFDaEQsQ0FBQyxDQUFBO1lBQ0YsTUFBTTtRQUNSLEtBQUssY0FBYztZQUNqQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDbkIsS0FBSyxFQUFFLGNBQWM7Z0JBQ3JCLFVBQVUsRUFBRSxHQUFHO2dCQUNmLE9BQU8sRUFBRSxPQUFPLElBQUksOENBQThDO2FBQ25FLENBQUMsQ0FBQTtZQUNGLE1BQU07UUFDUixLQUFLLFdBQVc7WUFDZCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDbkIsS0FBSyxFQUFFLFdBQVc7Z0JBQ2xCLFVBQVUsRUFBRSxHQUFHO2dCQUNmLE9BQU8sRUFBRSxPQUFPLElBQUksdUJBQXVCO2FBQzVDLENBQUMsQ0FBQTtZQUNGLE1BQU07UUFDUjtZQUNFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNuQixLQUFLLEVBQUUsdUJBQXVCO2dCQUM5QixVQUFVLEVBQUUsR0FBRztnQkFDZixPQUFPLEVBQUUsT0FBTyxJQUFJLGtDQUFrQzthQUN2RCxDQUFDLENBQUE7WUFDRixNQUFNO0tBQ1Q7SUFDRCxJQUFJLEVBQUUsQ0FBQztBQUNYLENBQUM7QUF4Q0Qsb0NBd0NDIn0=