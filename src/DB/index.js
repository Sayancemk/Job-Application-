import mongoose from "mongoose";

import {
    DB_NAME,
    DB_URL,
    PORT
    } from "../constants.js";

const connectDB= async()=>{

    mongoose.connect(`${DB_URL}/${DB_NAME}`).then((connectionInstance)=>{
            console.log(`MONGODB connected to ${DB_NAME} on port ${PORT}`)
           
    }).catch((error)=>{
        console.log("MONGODB connection error",Error);
        process.exit(1);
    })
}


export default connectDB;