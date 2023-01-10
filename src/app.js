const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const cookies = require("cookie-parser")
const rateLimit = require("express-rate-limit")
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/users.route");
const taskRouter = require("./routes/tasks.route");
const { errorHandler } = require("./middlewares/error.middleware");
require("dotenv").config();


const app = express();

const { DATABASE_CONN_STR } = process.env

// Manage MongoDB connection
mongoose.connect(DATABASE_CONN_STR, {
	useNewUrlParser: true,
	autoIndex: true, //make this also true
})

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});


app.use(cors({origin: "*"}))
app.use(express.json());
app.use(cookies())

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
app.use("/api/v1.0/users", userRouter);
app.use("/api/v1.0/tasks", taskRouter)

// Middleware for handling different types of errors
app.use(errorHandler)

app.get("/api/v1.0", (req, res) => {
    res.send("Welcome to Task-eet API v1.0")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})