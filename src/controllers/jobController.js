import Job from "../models/job.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createJob=asyncHandler(async(req,resp)=>{
    const{
        title,
        description,
        location,
        salary,
        jobType,
        responsibilities,
        experience,
        qualification,
        skills,
        deadline,
        jobNiches,
        newsLetterSent,
        hiringMultipleCandidate,
        jobStatus,  
        offer,
    }=req.body;

    if(!req.user){
        throw new ApiError(401,"Unauthorized,Please login first");
    }
    if(!title || 
        !description || 
        !location || 
        !salary || 
        !jobType || 
        !responsibilities || 
        !experience || 
        !qualification || 
        !skills || 
        !deadline || 
        !jobNiches || 
        !jobStatus
    ){
        throw new ApiError(400,"please fill the all the job details");
    }
    if(req.user.role!=="Employer"){
        throw new ApiError(403,"Forbidden,You are not allowed to create job");
    }
    const postedBy=req.user._id;
    const company=req.user.jobCompany;
    const job=await Job.create({
        title,
        description,
        location,
        salary,
        jobType,
        responsibilities,
        experience,
        qualification,
        skills,
        deadline,
        jobNiches,
        newsLetterSent,
        hiringMultipleCandidate,
        jobStatus,
        offer,
        postedBy,
        company
    });
    if(!job){
        throw new ApiError(500,"Job could not be created");
    }
    return resp
    .status(201)
    .json(new ApiResponse(201,{job},"Job created successfully"));

})




export{
    createJob,
}