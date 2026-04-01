const {userService} = require('../services/index');
const {SucessCode} = require('../utlis/https.codes')
const {asyncHandler, responseHandler} = require("../utlis/index")

class AuthController { 

    signup = asyncHandler( 
        async (req,res) => {
            const data = req?.body;
            const response = await userService.createService(data);
            return responseHandler.success(res, response, "Successfully Signup", SucessCode.OK)
        } 
    );



    signin = asyncHandler( 
        async (req,res) => {
            const data = req?.body;
            const response = await userService.loginService(data, res);
            return responseHandler.success(res, response, "Successfully Login", SucessCode.OK)
        } 
    );
    
    
    veriyToken = asyncHandler( 
        async (req,res) => {
            const token = req?.headers['x-access-token'];
            const response = await userService.verifyToken(token);
            return responseHandler.success(res, response, "Successfully to veify Token ", SucessCode.OK)
        } 
    );
    
    refreshToken = asyncHandler( 
        async (req,res) => {
            const oldToken = req.cookies.refreshToken;
            const response = await userService.genRefreshToken(oldToken, res);
            return responseHandler.success(res, response, "Successfully generate  Refresh Token ", SucessCode.OK)
        } 
    );
    
    logout = asyncHandler( 
        async (req,res) => {
            const oldToken = req.cookies.refreshToken;
            if(!oldToken)
                 return responseHandler.success(res, {}, "Already Logout", SucessCode.OK)

            const response = await userService.logout(oldToken, res);
            return responseHandler.success(res, response, "Successfully Logout ", SucessCode.OK)
        } 
    );
   

}



const authController = new AuthController();

module.exports = authController;