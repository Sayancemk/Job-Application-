import  Application from "../models/application.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import Job from "../models/job.model.js";
import {uploadOnCloudianry,deleteFromCloudinary} from "../utils/cloudinary.js";
const postapplication = asyncHandler(async (req, res) => {
    if(!req.user){
        throw new ApiError(401, 'Unauthorized');
    };
    if(req.user.role==="Employeer"){
        throw new ApiError(403, 'Employeer cannot apply for a job');
    };

    //This is the jonId
    const {id}=req.params;
    const{name, 
        email, 
        phone,
        address,
        education,
        skills,
        experience,
        coverLetter}=req.body;

if(!name || !email || !phone || !address ){
    throw new ApiError(400, 'Please fill all the fields');
};
const jobapllicationInfo={
    id: req.user._id,
    name,
    email,
    phone,
    address,
    education,
    skills,
    experience,
    coverLetter,
    role: req.user.role
};
const jobDetails = await Job.findById(id);
if(!jobDetails){
    throw new ApiError(404, 'Job not found');
};
const isApplicationExist = await applicationSchema.findOne({" jobInfo.id":id,"jobSeekerInfo.id": req.user._id}); 
if(isApplicationExist){
    throw new ApiError(400, 'You have already applied for this job');
}
if(req.user._id === jobDetails.postedBy){
    throw new ApiError(400, 'You cannot apply for your own job');
};
if(req.files){
    if(req.files.resume){
        const{resume}=req.files;
        const file = await uploadOnCloudianry(resume);  
        if(!file){
            throw new ApiError(500, 'Error uploading file');
        }
        jobDetails.resume={
            public_id: file.public_id,
            url: file.secure_url
        };
    }
}else{
    if(req.user && !req.user.resume){
        throw new ApiError(400, 'Please upload your resume');
    }
    jobDetails.resume={
        public_id: req.user && req.user.resume.public_id,
        url: req.user && req.user.resume.url,
    };
}
const employeerInfo={
    id: jobDetails.postedBy,
    role: 'Employeer',
};
const jobInfo={
    id: jobDetails._id,
    title: jobDetails.title,
};
const application = await applicationSchema.create(jobapllicationInfo,
    employeerInfo,
    jobInfo); 
if(!application){
    throw new ApiError(500, 'Error creating application');
}
 return res
 .status(201)
 .json(new ApiResponse(201, 'Application created', application));
})

const getAllApplicationsByEmployee = asyncHandler(async (req, res) => {
    if(!req.user){
        throw new ApiError(401, 'Unauthorized');
    };
    if(req.user.role==="JobSeeker"){
        throw new ApiError(403, 'JobSeeker cannot view applications');
    };
    const applications = await Application.find({"employeerInfo.id": req.user._id,"isDeleted.employeer": false});
    if(!applications){
        throw new ApiError(404, 'Applications not found');
    }
    return res
    .status(200)
    .json(new ApiResponse(200, 'Applications found', applications));
});

const getAllApplicationsByJobSeeker = asyncHandler(async (req, res) => {

    if(!req.user){
        throw new ApiError(401, 'Unauthorized');
    }
    if(req.user.role==="Employeer"){
        throw new ApiError(403, 'Employeer cannot view allJobseekerallapplications');
    }
    const applications = await Application.find({"jobSeekerInfo.id": req.user._id,"isDeleted.jobSeeker": false});
    if(!applications){
        throw new ApiError(404, 'Applications not found');
    }
    return res
    .status(200)
    .json(new ApiResponse(200, 'Applications found', applications));


})

export {
    postapplication,
    getAllApplicationsByEmployee,

}

