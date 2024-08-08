import express from "express";
import {
    signUp,
    signIn,
    signOut,
    getYourProfile,
    updateProfile,
    updatePassword,
    deleteUser,

} from "../controllers/userController.js"
import { isUserAuthenticated } from "../middlewares/userAuth.js";
const router=express.Router();

router.route("/sign-up").post(signUp);

router.route("/sign-in").post(signIn);

router.route("/sign-out").post(isUserAuthenticated ,signOut);

router.route("/profile").get(isUserAuthenticated,getYourProfile);

router.route("/update/profile").put(isUserAuthenticated,updateProfile);

router.route("/update/password").put(isUserAuthenticated,updatePassword);

router.route("/delete").delete(isUserAuthenticated,deleteUser);



export default router;