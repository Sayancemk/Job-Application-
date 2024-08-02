import express from "express";
import{
    createJob,
    getAllJobs,

} from "../controllers/jobController.js";

import { isUserAuthenticated } from "../middlewares/userAuth.js"; 

const router=express.Router();

router.route("/create-job").post(isUserAuthenticated,createJob);

router.route("get-all-jobs").get(getAllJobs);




export default router;