import { asyncHandler} from "../utils/asyncHandler.js";    
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce} from "../utils/ApiResponse";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const isUserAuthenticated = asyncHandler(async (req,resp,next) => {
    try{
const {token} = req.cookies;
if (!token) {
    throw new ApiError(401, "User is not authenticated");    
}
const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
if (!decodedToken) {
    throw new ApiError(401, "User is not authenticated");    
}
const user = await User.findById(decodedToken.id);
if (!user) {
    return next();
}
req.user = user;
next();
}catch(error){
        if (error.message === "jwt expired") {
            throw new ApiError(401,"Token expired");  
        }else{
            throw new ApiError(403,"Unauthorized request");
        }
    }
})



export 
    {
    isUserAuthenticated
    };