
const jwt = require('jsonwebtoken');
const { PRIVATEJWT,  RefreshPRIVATEJWT } = require("../config/server.config");
const asyncHandler = require("./async.handler")
const AppError = require("./Errors/AppErrors")

class JWT {

  createToken = asyncHandler( 
    async(data, time= '10m') => {
     const token = await jwt.sign({ data }, PRIVATEJWT, {
        expiresIn: time, 
      });

      return token;
    }
  )
  
  createRefreshToken = asyncHandler( 
    async(data, time= '7d') => {
      const token = await jwt.sign({ data }, RefreshPRIVATEJWT, {
        expiresIn: time, 
      });

      return token;
    }
  )
  
  
  verifyToken = async (token) => {
      try {
          const response = jwt.verify(token, PRIVATEJWT);
          if (!response)
              throw new AppError(401, "Invalid Token", "Invalid or Expired Token");
          return response;
      } catch (err) {
          if (err.name === "TokenExpiredError")
              throw new AppError(401, "Token Expired", "Your token has expired, please log in again");
          if (err.name === "JsonWebTokenError")
              throw new AppError(401, "Invalid Token", "Invalid token signature");
          throw err;
      }
  }
  
  verifyRefreshToken = asyncHandler( 
    async(token) => {
     const response = jwt.verify(token, RefreshPRIVATEJWT);
     console.log("response => ", response)
      if (!response) throw new AppError("", "Invalid Refresh Token", "Invalid or Expire Refresh Token");
      return response;
    }
  )



}

const jwt_helper = new JWT();

module.exports = jwt_helper ;
