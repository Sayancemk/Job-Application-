import Company from "../models/company.model.js";
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {uploadOnCloudianry,deleteFromCloudinary} from "../utils/Cloudinary.js";
const userRegisterInCompany=asyncHandler(async(req,resp)=>{
    if(!req.user){
        throw new ApiError(401,"Unauthorized,Please login first");
    }
    if(req.user.role!=="Employer"){
          throw new ApiError(403,`Forbidden,${req.user.role}, you are  not eligible to use this path `);
    }
    const {
        companyName,
        website,
        email,
    }=req.body;
    if(!companyName || !website || !email){
        throw new ApiError(400,"All Fields are required")
    }
    const company=await Company.findOne({name:companyName});
    if(company){
        throw new ApiError(400,"User is not required to register in same comapany")
    }
    const userId=req.user._id;
    const newCompany=await Company.create({
        name: companyName,
        website: website,
        email:email,
        userId:userId,  
    })
    if(!newCompany){
        throw new ApiError(400,"something went wrong")
    }
    return resp
    .status(200)
    .json(new ApiResponse(200,newCompany,"Company created successfully"))
})

const getAllCompanies=asyncHandler(async(req,resp)=>{
    const {searchKeyword}=req.query;
    const query={};

    if(searchKeyword){
        query.$or=[
            {name:{$regex:searchKeyword, $options:"i"}},
            {website:{$regex:searchKeyword, $options:"i"}},
        ]
    }

    const company=await Company.find({query}).sort({createdAt:-1})
    if(!company){
        throw new ApiError(400,"something went wrong while finding the company")
    }
    
    return resp
    .status(200)
    .json(new ApiResponse(200,{company,count:company.length},"This is all company details"))
})

const getCompanyRegisteredByUser=asyncHandler(async(req,resp)=>{
    if(!req.user){
        throw new ApiError(401,"Unauthorized,Please login first");
    }
    if(req.user.role!=="Employer"){
          throw new ApiError(403,`Forbidden,${req.user.role}, you are  not eligible to use this path `);
    }
    
    const findCompany=await Company.find({userId:req.user._id});
    if(!findCompany){
        throw new ApiError (400,"Company not found")
    }
    return resp
    .status(200)
    .json(new ApiResponse(200,findCompany,"this is all the companies details"))
})

const getCompanyFindById=asyncHandler(async(req,resp)=>{
    if(!req.user){
        throw new ApiError(401,"Unauthorized,Please login first");
    }
    if(req.user.role!=="Employer"){
          throw new ApiError(403,`Forbidden,${req.user.role}, you are  not eligible to use this path `);
    }
    const{companyId}=req.params;
    if(!companyId){
        throw new ApiError(400,"CompanyId is required")
    }
    const findCompany=await Company.findById({companyId});
    if(!findCompany){
        throw new ApiError (400,"cmpany is not find")
    }
    return resp
    .status(200)
    .json(new ApiResponse(200,findCompany,"This is your searched company"))
})
/*
const updateCompanyDetails=asyncHandler(async(req,resp)=>{
    if(!req.user){
        throw new ApiError(401,"Unauthorized,Please login first");
    }
    if(req.user.role!=="Employer"){
          throw new ApiError(403,`Forbidden,${req.user.role}, you are  not eligible to use this path `);
    }
    const{companyId}=req.params;
    if(!companyId){
        throw new ApiError(400,"CompanyId is required to update")
    }
    const {name,email,website,description,address}=req.body;
    if(!name || !email || !website){
        throw new ApiError(400,"please fill all the fields")
    }
    const updateData={name,email,website,description,address}
    if(req.files){
        const {logo}=req.files;
        if(!logo){
            throw new ApiError(400,"logo or filepath required")
        }
        const currentlogoId=req.user.jobCompany.logo.public_id;
        if(currentlogoId){
            await deleteFromCloudinary(currentlogoId);
        }
        const newLogo=await uploadOnCloudianry(logo.tempFilepath);
        if(!newLogo){
            throw new ApiError(500,"Failed to upload resume on cloudinary")
        }
        updateData.logo={
            public_id:newLogo.public_id,
            url:newLogo.secure_url,
        }

    }
    const company=await Company.findByIdAndUpdate(companyId,updateData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    
    if(!company){
        throw new ApiError(400,"company is not find")
    }
    return resp
    .status(200)
    .json(new ApiResponse(200,company,"Company data finally updated"))

})*/

const updateCompanyDetails=asyncHandler(async(req,resp)=>{
 
    if(!req.user){
        throw new ApiError(401,"Unauthorized,Please login first");
    }
    if(req.user.role!=="Employer"){
          throw new ApiError(403,`Forbidden,${req.user.role}, you are  not eligible to use this path `);
    }
    const{companyId}=req.params;
    if(!companyId){
        throw new ApiError(400,"CompanyId is required to update")
    }
    const {name,email,website,description,address}=req.body;
    if(!name || !email || !website){
        throw new ApiError(400,"please fill all the fields")
    }
    const updateData={name,email,website,description,address}
    if(req.files){
        const {logo}=req.files;
        if(!logo){
            throw new ApiError(400,"logo or filepath required")
        }
        const currentlogoId=req.user.jobCompany.logo.public_id;
        if(currentlogoId){
            await deleteFromCloudinary(currentlogoId);
        }
        const newLogo=await uploadOnCloudianry(logo.tempFilepath);
        if(!newLogo){
            throw new ApiError(500,"Failed to upload resume on cloudinary")
        }
        updateData.logo={
            public_id:newLogo.public_id,
            url:newLogo.secure_url,
        }

    }
    const company=await Company.findByIdAndUpdate(companyId,updateData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    
    if(!company){
        throw new ApiError(400,"company is not find")
    }
    return resp
    .status(200)
    .json(new ApiResponse(200,company,"Company data finally updated"))
})


export{
    userRegisterInCompany,
    getAllCompanies,
    getCompanyRegisteredByUser,
    getCompanyFindById,
    updateCompanyDetails,
}