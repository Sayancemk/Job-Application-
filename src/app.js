import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorhandler from './middlewares/errorHandler.middleware.js';
import userRouter from "./routes/userRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import companyRouter from "./routes/companyRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import fileUpload from "express-fileupload";

const app=express();


app.use(
    cors({
        origin:[process.env.FRONTED_URL],
        method:["GET","POST","DELETE","PUT"],
        credentials:true,
    })
)



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

app.use("/api/v1/user",userRouter);
app.use("/api/v1/job",jobRouter);
app.use("/api/v1/comapny",companyRouter);
app.use("api/v1/application",applicationRouter);

app.use(errorhandler);

export default app;