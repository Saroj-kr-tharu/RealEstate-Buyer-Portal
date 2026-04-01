
const {ClientErrorsCodes} = require('../utlis/https.codes')
const {responseHandler} = require('../utlis/index')
class UserMiddleware {

   signupAndLogin = (req, res, next) => {
      if (!req.body?.email || !req.body?.password   ) {

        return responseHandler.error(res, "Email or Password is missing", ClientErrorsCodes.BAD_REQUEST)
        
      }

      next();
    };
    
    verifyToken = (req, res, next) => {
        const token = req?.headers['x-access-token'];
        if (!token ) {
            return responseHandler.error(res, "Token is missing", ClientErrorsCodes.UNAUTHORIZED)
            
        }

      next();
    };
    
    verifyRefreshToken = (req, res, next) => {

       const oldToken = req.cookies['refreshToken'];
       
        if (!oldToken ) {
            // console.log("No refresh token is missing ");
            return responseHandler.error(res, "Refresh Token is missing", ClientErrorsCodes.UNAUTHORIZED)
        }

      next();
      
    };

}





const userMiddlewares = new  UserMiddleware()

module.exports = userMiddlewares; 
