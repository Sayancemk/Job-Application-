import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new mongoose.Schema({
  
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Your name cannot exceed 30 characters"],
        minLength: [4, "Your name should have more than 4 characters"],        
    },

    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email address"],
    },
    phone:{
        type:Number,
        required:true,
    },

    address:{
        type:String,
        required:true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Your password should be longer than 6 characters"],
        select: false,
    },  

    niches:{
        firstNiche:{
            type:String,
            required:true,
        },
        secondNiche:{
            type:String,
            required:true,
        },
        thirdNiche:{
            type:String,
            required:true,
        },
    },
        password: {
            type: String,
            required: [true, "Please enter your password"],
            minLength: [6, "Your password should be longer than 6 characters"],
            select: false,
        },

        resume:{
            public_id:{
                type:String,
            },
            url:{
                type:String,
            },
        },
        coverLetter:{
            type:String,
        },
        role:{
            type:String,
            required:true,
            enum:["Employer","JobSeeker"],
        }
},{timestamps:true});


const User=mongoose.model("User",userSchema);   

export default User;