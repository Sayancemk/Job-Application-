import express from "express";
import{
    postapplication,
    getAllApplicationsByEmployee,
    getAllApplicationsByJobSeeker,
    deletedJobApplication,
    updateStatus,

} from "../controllers/applicationController.js";
import {isUserAuthenticated} from "../middlewares/userAuth.js"
const router=express.Router();

router.route("/apply/:id").post(isUserAuthenticated,postapplication);

router.route("/applicationsForEmployee").get(isUserAuthenticated,getAllApplicationsByEmployee);    

router.route("/applicationsByJobSeeker").get(isUserAuthenticated,getAllApplicationsByJobSeeker);

router.route("/delete-job/:id").delete(isUserAuthenticated,deletedJobApplication);

router.route("/update-status/:id").put(isUserAuthenticated,updateStatus);

export default router;