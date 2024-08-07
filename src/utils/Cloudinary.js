import cloudinary from "cloudinary";
import { ApiError } from "./ApiError.js";
import {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} from "../constants.js";

cloudinary.v2.config({
    cloud_name:CLOUDINARY_CLOUD_NAME,
    api_key:CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_API_SECRET
});

const uploadOnCloudianry=async(filePath)=>{
    if(!filePath)
        return null;
    try{
        const cloudinaryResponse=await cloudinary.uploader.upload(filePath,{resource_type:"auto",folder:"Job_Seekers_Resume"}
        );
        return cloudinaryResponse;
    }
       
    catch(error){
        return null;
}
}

const deleteFromCloudinary = async (public_id) => {
    try {    
        const responce = await cloudinary.uploader.destroy(public_id)
        return responce;
    } catch (error) {
      return null;
    }
  }


export {
    uploadOnCloudianry,
    deleteFromCloudinary,
}