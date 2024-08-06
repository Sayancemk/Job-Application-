import express from "express";
import{
    postapplication,
    getAllApplicationsByEmployee,
    getAllApplicationsByJobSeeker,


} from "../controllers/applicationController.js";
import {isUserAuthenticated} from "../middlewares/userAuth.js"
const router=express.Router();

router.route("/apply/:id").post(isUserAuthenticated,postapplication);

router.route("/applicationsForEmployee").get(isUserAuthenticated,getAllApplicationsByEmployee);    

router.route("/applicationsByJobSeeker").get(isUserAuthenticated,getAllApplicationsByJobSeeker);

export default router;