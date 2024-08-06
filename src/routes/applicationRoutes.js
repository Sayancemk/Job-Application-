import express from "express";
import{
    postapplication,


} from "../controllers/applicationController.js";
import {isUserAuthenticated} from "../middlewares/userAuth.js"
const router=express.Router();

router.route("/apply/:id").post(isUserAuthenticated,postapplication);





export default router;