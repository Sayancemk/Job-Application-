import express from "express";
import{
userRegisterInCompany,

} from "../controllers/companyController.js";
import{isUserAuthenticated} from "../middlewares/userAuth.js"

const router=express.Router();




export default router;