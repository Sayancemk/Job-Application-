import mongoose from "mongoose";

import {
    MONGODB_NAME,
    MONGODB_URL,
    PORT
    } from "./constants.js";

const connectDB= async()=>{

    mongoose.connect(`${MONGODB_URL}/${MONGODB_NAME}`).then((connectionInstance)=>{
            console.log(`MONGODB connected to ${MONGODB_NAME} on port ${PORT}`)
           
    }).catch((error)=>{
        console.log("MONGODB connection error",Error);
        process.exit(1);
    })
}
export default connectDB;