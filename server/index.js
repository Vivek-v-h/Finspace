import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutes from "./routes/user.route.js";
import AuthRoutes from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';
import path from 'path';
import transaction_route from './routes/transaction.route.js'
import budget_route from './routes/budget.route.js'
import sum from "./routes/sum.route.js"

dotenv.config();

const app=express();
app.use(express.json());

mongoose.connect(process.env.USERSMONGOURL).then(()=>{
    console.log("connected to users database")}
    ).catch((err)=>{
        console.log(err)
    });
;

app.listen(3000,()=>{
    console.log("Server running on port 3000")
})
app.use(cookieParser());
const __dirname = path.resolve();
app.use("/api/user",UserRoutes)
app.use("/api/auth",AuthRoutes)
app.use("/api/v1/transections",transaction_route);
app.use("/api/v1/budget",budget_route);
app.use("/api/v1/sum",sum)
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || 'Internal Server Error';
    return res.status(statusCode).json({success:false,
    message,
    statusCode
    });
});