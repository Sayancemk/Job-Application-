import express from "express";

import{
userRegisterInCompany,
getAllCompanies,
getCompanyRegisteredByUser,
getCompanyFindById,
updateCompanyDetails,

} from "../controllers/companyController.js";

import{isUserAuthenticated} from "../middlewares/userAuth.js"

const router=express.Router();

router.route("/register-company").post(isUserAuthenticated,userRegisterInCompany);

router.route("/get-all-company").get(getAllCompanies);

router.route("/get-companies-register-by-user").get(isUserAuthenticated,getCompanyRegisteredByUser);

router.route("/find-company-by-id/:id").get(isUserAuthenticated,getCompanyFindById);

router.route("/upadte-company-details/:id").put(isUserAuthenticated,updateCompanyDetails);


export default router;