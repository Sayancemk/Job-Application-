import dotenv from "dotenv";
import connectDB from './DB/index.js';
import app from "./app.js";
import { urlencoded } from "express";

dotenv.config({ path: "./.env" });
// connect to database
connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.error("Error on express server:"+error);
        throw error;
    })

    app.listen(process.env.PORT||3001,()=>{
        console.log("Server is running on port no " + process.env.PORT||3001)
    })
})
.catch((err)=>{
    console.error("Error on connect Express:"+err);
    throw err;
})