import Job from "../models/job.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createJob=asyncHandler(async(req,resp)=>{
    
    if(!req.user){
      throw new ApiError(401,"Unauthorized,Please login first");
    }

    if(req.user.role!=="Employer"){
          throw new ApiError(403,`Forbidden,${req.user.role} are not allowed to create job`);
    }

    if(!req.user.jobCompany){
        throw new ApiError(401,"please provide the company name")
    }

    const{
        title,
        description,
        responsibilities,
        location,
        salary,
        jobType,
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

const getAllJobs=asyncHandler(async(req,resp)=>{
    const{city,jobNiches,searchKeyword}=req.query;
    const query={}
    if(city){
        query.location=city;
    }
    if(jobNiches){
        query.jobNiches=jobNiches;
    }
    if(searchKeyword){
        query.$or=[
           {title:{$regex:searchKeyword,$options:""}},

        ]
    }
})


export{
    createJob,
}