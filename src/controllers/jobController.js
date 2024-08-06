import Job from "../models/job.model.js";
import User from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";

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
           {title:{$regex:searchKeyword, $options:"i"}},
           {company:{$regex:searchKeyword, $options:"i"}},
           {description:{$regex:searchKeyword, $options:"i"}},
           {jobStatus:{$regex:searchKeyword, $options:"i"}},
           {experience:{$regex:searchKeyword, $options:"i"}},
           {skills:{$regex:searchKeyword, $options:"i"}},
           {jobType:{$regex:searchKeyword, $options:"i"}},
           {qualification:{$regex:searchKeyword, $options:"i"}},
           
        ]
    }
    const findedJob=await Job.find(query).sort({createdAt:-1});
    if(!findedJob){
        throw new ApiError(400,"something went wrong for finding job according to your criteria")
    }
    return resp
    .status(200)
    .json(new ApiResponse(200,{findedJob,count:findedJob.length},"This is all the job details  acccording to your criteria") )
})

const findJobById=asyncHandler(async(req,resp)=>{
    
    if(!req.user){
        throw new ApiError(401,"Unauthorized,Please login first");
    }
    
    if(req.user.role!=="Employer"){
        throw new ApiError(403,`Forbidden,${req.user.role} are not allowed to find job`);
  }

    const{jobId}=req.params;

    if(!jobId){
        throw new ApiError(400,"JobId is required")
    }

    const findedJob=await Job.findById(jobId);

    if(!findedJob){
        throw new ApiError(400,"This job is unavialable");
    }

    return resp
    .status(200)
    .json(new ApiResponse(200,findedJob,"This is your searched job details"))
})

const jobPostedByUser=asyncHandler(async(req,resp)=>{

    if(!req.user){
        throw new ApiError(401,"Unauthorized,Please login first");
    }

    if(req.user.role!=="Employer"){
          throw new ApiError(403,`Forbidden,${req.user.role}, you are eligible for see your job posts `);
    }

    const user=await User.findById(req.user._id);

    if(!user){
        throw new ApiError(400,"requested User details can not find here")
    }

    const jobPostedByMe=await Job.find({postedBy:user});

    return resp
    .status(200)
    .json(new ApiResponse(200,jobPostedByMe,"This is all of your posted job"))
})

const deleteJob=asyncHandler(async(req,resp)=>{

    if(!req.user){
        throw new ApiError(401,"Unauthorized,Please login first");
    }

    if(req.user.role!=="Employer"){
          throw new ApiError(403,`Forbidden,${req.user.role}, you are eligible for delete the job posts `);
    }

    const {jobId}=req.params;
    
    if(!jobId){
        throw new ApiError (400,"JobId is required to delete the jobPost")
    }

    const deleteJob=await Job.findById(jobId);

    await deleteJob.deleteOne();

    return resp
    .status(200)
    .json(new ApiResponse(200,{},"Job deleted successfully"))
})

const updateJob=asyncHandler(async(req,resp)=>{
    
    if(!req.user){
        throw new ApiError(401,"Unauthorized,Please login first");
    }
    
    if(req.user.role!=="Employer"){
          throw new ApiError(403,`Forbidden,${req.user.role}, you are  not eligible to use this path `);
    }
    const updates=Object.keys(req.body);
    const allowedUpadtes=["title","description","location","salary","jobStatus","jobNiches","deadline","skills","jobType"];
    const isValidOperation=updates.every(update=>allowedUpadtes.includes(update));
    if(!isValidOperation){
        throw new ApiError(400,"Invalid upadte operation")
    }
    const {jobId}=req.params;
    if(!jobId){
        throw new ApiError (400,"JobId is required to delete the jobPost")
    }
    const job=await Job.findById(jobId);
    if(!job){
        throw new ApiError(400,"Job is not find")
    }
    updates.forEach(update=>job[update]=req.body[update]);
    await job.save();
   return resp
    .status(200)
    .json(new ApiResponse(200,job,"Job updated successfully"));
})

export{
    createJob,
    getAllJobs,
    findJobById,
    jobPostedByUser,
    deleteJob,
    updateJob,
}