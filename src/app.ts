import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();
import cookies from "cookie-parser";
import rateLimit from "express-rate-limit";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/users.route";
import taskRouter from "./routes/tasks.route";
import { errorHandler } from "./middlewares/error.middleware.js";
import helmet from "helmet";



const app: Application = express();

const { DATABASE_CONN_STR } = process.env;

if(DATABASE_CONN_STR){
	// Manage MongoDB connection
	mongoose.connect(DATABASE_CONN_STR, {
		// useNewUrlParser: true,
		autoIndex: true, //make this also true
	})

	mongoose.connection.on("connected", () => {
		console.log("Connected to MongoDB Successfully");
	});

	mongoose.connection.on("error", (err) => {
		console.log("An error occurred while connecting to MongoDB");
		console.log(err);
	});

}


app.use(cors({origin: "*"}))
app.use(express.json());
app.use(cookies());
app.use(helmet());

const PORT = process.env.PORT || 8000;

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

// Connect routers to express application
app.use("/api/v1.0", authRouter);
// app.use("/api/v1.0/users", userRouter);
// app.use("/api/v1.0/tasks", taskRouter)

app.get("/api/v1.0", (req: Request, res: Response) => {
    res.send("Welcome to Task-eet API v1.0")
})

app.get("/", (req: Request, res: Response) => {
    res.redirect("/api/v1.0");
})

// // Middleware for handling different types of errors
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})