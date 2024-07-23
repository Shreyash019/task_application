import dotenv from "dotenv";
dotenv.config({path: "./config/project.env"});
import express, {Application, NextFunction, Request, Response} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./utils/passport"; 
import Database_Connection from "./Database_Connection";
import userRoutes from "./modules/user_module/UserRoutes";
import taskRoutes from "./modules/todo_module/TaskRoutes";
import path from 'path';
const PORT: number = parseInt(process.env.PORT || "5000");
const app:Application = express()
const corsOptions = {
  origin: "https://task-client-fiae.onrender.com", // Allow all origins
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// Serve static files from the 'dist' directory (where Vite builds the files)
app.use(express.static(path.join(__dirname, 'public', 'dist')));
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

// Database instance creation then connecting database
const databaseConnection = new Database_Connection();
databaseConnection.mongodbConnection()


// Custom error handling for unauthorized access
app.use((err:any, req:Request, res:Response, next:NextFunction) => {
  console.log(req.cookies)
  console.log(req.url)
  next();
});
app.use("/user", userRoutes);
app.use("/task", taskRoutes);

app.get("/user/hello", (req:Request, res:Response)=>{
  res.status(200).json({
    message: "Welcome to user service"
  })
})


app.get("*", (req:Request, res:Response)=>{
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})


app.listen(PORT, () => {
    console.log("Server is running on port ${PORT}...");
  });