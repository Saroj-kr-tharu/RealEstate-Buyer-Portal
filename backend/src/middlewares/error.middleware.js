
const {responseHandler} = require('../utlis/index');

const errorMiddleware = (err, req, res, next) => {
    console.log(err)
    // Custom Error
    if (err.statusCode) {
        return responseHandler.error(
            res,
            err.message,
            err.statusCode,
            { explanation: err.explanation }
        );
    }

  
    return responseHandler.error(res, "Something went wrong");
};

module.exports = errorMiddleware;