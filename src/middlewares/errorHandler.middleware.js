import {ApiResponse} from "../utils/ApiResponse.js"

const errorHandler = (err, req, res, next) => {
    res.status(200)
    .json(new ApiResponse(err.statusCode || 500,null, err.message));
};

export default errorHandler;


