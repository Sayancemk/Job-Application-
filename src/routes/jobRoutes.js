import express from "express";
import{
    createJob,
    getAllJobs,
    findJobById,
    jobPostedByUser,
    deleteJob,
    updateJob,

} from "../controllers/jobController.js";

import { isUserAuthenticated } from "../middlewares/userAuth.js"; 

const router=express.Router();

router.route("/create-job").post(isUserAuthenticated,createJob);

router.route("/get-all-jobs").get(getAllJobs);

router.route("/find-job/:id").get(isUserAuthenticated,findJobById);

router.route("/job-post-by-me").get(isUserAuthenticated,jobPostedByUser);

router.route("/delete-job").delete(isUserAuthenticated,deleteJob);

router.route("/update-job-by-id/:id").put(isUserAuthenticated,updateJob);



export default router;