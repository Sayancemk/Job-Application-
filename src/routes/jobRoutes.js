import express from "express";
import{
    createJob,
} from "../controllers/jobController.js";
import { isUserAuthenticated } from "../middlewares/userAuth.js";   
const router=express.Router();
router.route("/create-job").post(isUserAuthenticated,createJob);




export default router;