import express from "express";
import {
    signUp,
    signIn,


} from "../controllers/userController.js"
const router=express.Router();

router.route("/sign-up").post(signUp);
router.route("/sign-in").post(signIn);

export default router;