import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isUserAuthenticated = asyncHandler(async (req, resp, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")
        if (token == null) {
            throw new ApiError(401, "token not found");
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decodedToken) {
            throw new ApiError(401, "User is not authenticated");
        }
        const user = await User.findById(decodedToken.id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error.message);
    }
})



export {
    isUserAuthenticated
};