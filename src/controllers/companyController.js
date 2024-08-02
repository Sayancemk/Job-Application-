import Company from "../models/company.model";
import {ApiError} from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";

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
    const userId=req.User._id;
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
    .json(200,newCompany,"Company created successfully")
})



export{
    userRegisterInCompany,
}