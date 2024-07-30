import {User} from "../models/user.model.js";
import {ApiResponce} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";

const signUp=asyncHandler(async(req,resp)=>{
    const{name,
        email,
        phone,
        address,
        password,
        role,
        firstNiche,
        secondNiche,
        thirdNiche,
        coverLetter}=req.body;
    
    if(!name || !email || !phone ||!address ||!password ||!role){
        throw new ApiError(400,"Please fill in all the fields");
    }

    if(role==="JobSeeker" && (!firstNiche || !secondNiche || !thirdNiche)){
        throw new ApiError(400,"Please fill in all the fields");
    }
    if(role==="Employer" && (!coverLetter)){
        throw new ApiError(400,"Please fill in all the fields");
    }
    if(password.length<6){
        throw new ApiError(400,"Password should be atleast 6 characters long");
    }
    
})
