import User from "../models/user.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {uploadOnCloudianry,deleteFromCloudinary} from "../utils/Cloudinary.js";
import { sendToken } from "../utils/sendToken.js";
function isValidUsername(inputString) {
    // Check if the string starts or ends with "-"
    if (inputString.startsWith('-') || inputString.endsWith('-')) {
        return "Username cannot start or end with '-'";
    }
    // Check if the string contains spaces, special characters (except "-"), or capital letters
    if (/[\sA-Z!@#$%^&*()_+={}[\]:;<>,.?~\\\/]/.test(inputString)) {
        return "Username can only contain lowercase letters, numbers, and hyphens";
    }
    // Check if the string starts with a number
    if (/^\d/.test(inputString)) {
        return "Username cannot start with a number";
    }
        // If all conditions are met, return true
        return true;
    }

    // function for validation email
function validateEmail(email) {
    // Regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the regular expression
    return emailRegex.test(email);
}

// function for strong password
function isStrongPassword(password) {
    // Check if password length is at least 8 characters
    if (password.length < 8) {
        return "Password must be at least 8 characters long";
    }
      // Regular expressions to check if password contains required characters
      const lowerCaseRegex = /[a-z]/;
      const upperCaseRegex = /[A-Z]/;
      const digitRegex = /[0-9]/;
      const specialCharRegex = /[!@#$%^&*]/;
  
      // Check if password contains at least one lowercase letter
      if (!lowerCaseRegex.test(password)) {
          return "Password must contain at least one lowercase letter";
      }
  
      // Check if password contains at least one uppercase letter
      if (!upperCaseRegex.test(password)) {
          return "Password must contain at least one uppercase letter";
      }
      // Check if password contains at least one digit
    if (!digitRegex.test(password)) {
        return "Password must contain at least one digit";
    }

    // Check if password contains at least one special character
    if (!specialCharRegex.test(password)) {
        return "Password must contain at least one special character";
    }

    // If all conditions pass, password is strong
    return true;
}

// Sign-up the user
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
        throw new ApiError(400,"Please fill in all the fields ");
    }
    //check for the JobSeeker
    if(role==="JobSeeker" && (!firstNiche || !secondNiche || !thirdNiche)){
        throw new ApiError(400,"Please fill in all the choice fields or niches");
    }
    //check for the Employer
    if(role==="Employer" && (!coverLetter)){
        throw new ApiError(400,"Please fill in coverletter fields");
    }
    //username is validate or not
    const isvalidName=isValidUsername(name);
    if(!isvalidName){
        throw new ApiError(400,"name is not valid");
    }
    //email is valid or not
    if(!validateEmail(email)){
        throw new ApiError(400,"email is not validate")
    }
    //password is  valid or not
    const passwordError=isStrongPassword(password);
    if(passwordError!==true){
        throw new ApiError(400,passwordError)
    
    }
      //check username is already exists
    const existingUser=await User.findOne({name:name});
      if(existingUser){
          throw new ApiError (400,"user is already exists");
    }
        // check email is already exists
    const existingEmail=await User.findOne({email:email});
    if(existingEmail){
        throw new ApiError(400, " email is already exists");
    }

    const userData={
        name,
        email,
        phone,
        address,
        password,
        role,
        niches:
        { firstNiche,
        secondNiche,
        thirdNiche
        },
        coverLetter
    }
    if(req.files && req.files.resume){
        const {resume}=req.files;
        if(!resume){
            throw new ApiError (400,"resume or filePath is required")
        }
        const uploadResume=await uploadOnCloudianry(resume.tempFilepath);
        if(!uploadResume){
            throw new ApiError(500,"Failed to upload resume on cloudinary")
        } 
        userData.resume={
            public_id:uploadResume.public_id,
            url:uploadResume.secure_url,
        }
        if(!userData.resume){
            throw new ApiError(500,"Something Went Wrong")
        }
    }
    const user=await User.create(userData);
    sendToken(user,resp);
    return resp
    .status(201)
    .json(new ApiResponse(201,user,"User signUp succesfully"));

})

const signIn=asyncHandler(async(req,resp)=>{
    const {email,password,role}=req.body;
    if(!role || !email || !password){
        throw new ApiError(400,"email and password  also role is required");
    }
    const user=await User.findOne({email:email}).select("+password");
    if(!user){
        throw new ApiError(401,"Invalid Credentials")
    }
    const isPasswordMatch=await user.comparePassword(password);
    if(!isPasswordMatch){
        throw new ApiError(401,"Invalid Credentials")
    }
    if(user.role!==role){
        throw new ApiError(401,"Invalid User Role")
    }
    sendToken(user,resp);
    return resp
    .status(200)
    .json(new ApiResponse(200,user,"User signIn succesfully"));
    
})

const signOut=asyncHandler(async(req,resp)=>{
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    }
    return resp
    .status(200)
    // .clearCookie("token", { ...options, maxAge: (86400000 * 180) })
    .json(new ApiResponse(200, {}, "User logged out successfully"));
})
  

const getYourProfile=asyncHandler(async(req,resp)=>{
    const user=await User.findById(req.user._id);
    if(!user){
        throw new ApiError(404,"User not found");
    }
    return resp
    .status(200)
    .json(new ApiResponse(200,user,"User Profile fetched succesfully"));

})

const updateProfile=asyncHandler(async(req,resp)=>{
    if(!req.user){
        throw new ApiError(404,"User not found");
    }
const newUserData={
    name:req.body.name || req.user.name,
    email:req.body.email || req.user.email,
    phone:req.body.phone || req.user.phone,
    address:req.body.address || req.user.address,
    coverLetter:req.body.coverLetter || req.user.coverLetter,
    niches:{
        firstNiche:req.body.firstNiche || req.user.niches.firstNiche,
        secondNiche:req.body.secondNiche || req.user.niches.secondNiche,
        thirdNiche:req.body.thirdNiche || req.user.niches.thirdNiche,
    }
}

    const {firstNiche,secondNiche,thirdNiche}=newUserData.niches;

    if(req.user.role==="JobSeeker" && (!firstNiche || !secondNiche || !thirdNiche)){
        throw new ApiError(400,"Please fill in all the choice fields or niches");
    }
    if(req.user.role==="Employer" && (!coverLetter)){
        throw new ApiError(400,"Please fill in coverletter fields");
    }
    if(req.files){
        const {resume}=req.files;
        if(!resume){
            throw new ApiError(400,"resume or filePath is required")
        }
       const currentcurrentResumeId=req.user.resume.public_id;
       if(currentcurrentResumeId){
           await deleteFromCloudinary(currentcurrentResumeId);
       }
        const newResume=await uploadOnCloudianry(resume.tempFilepath);
        if(!newResume){
            throw new ApiError(500,"Failed to upload resume on cloudinary")
        }
        newUserData.resume={
            public_id:newResume.public_id,
            url:newResume.secure_url,
        }
    }
    const user=await User.findByIdAndUpdate(req.user._id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    return resp
    .status(200)
    .json(new ApiResponse(200,user,"User Profile updated succesfully"));

})

const deleteUser=asyncHandler(async(req,resp)=>{
    const user=req.user._id;
    if(!user){
        throw new ApiError(404,"User not found");
    }
    await User.findByIdAndDelete(user);
    return resp
    .status(200)
    .json(new ApiResponse(200,{},"User deleted succesfully"));

})

const updatePassword=asyncHandler(async(req,resp)=>{
    const user=await User.findById(req.user._id).select("+password");
    console.log(user);
    if(!user){
        throw new ApiError(404,"User not found");
    }
    const isPasswordMatch=await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatch){
        throw new ApiError(401,"old password is incorrect");
    }
    if(req.body.oldPassword===req.body.newPassword){
        throw new ApiError(400,"New password cannot be the same as old password");
    }
    if(req.body.newPassword!==req.body.confirmPassword){
        throw new ApiError(400,"Password does not match");
    }
    const passwordError=isStrongPassword(req.body.newPassword);
    if(passwordError!==true){
        throw new ApiError(400,passwordError)
    }
    user.password=req.body.newPassword;
    await user.save();
    sendToken(user,resp);
    return resp
    .status(200)
    .json(new ApiResponse(200,user,"Password updated succesfully"));

})





export {
    signUp,
    signIn,
    signOut,
    getYourProfile,
    updateProfile,
    updatePassword,
    deleteUser,
}