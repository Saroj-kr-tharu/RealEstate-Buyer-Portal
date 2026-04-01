const bcrypt = require("bcrypt");
const AppError = require("./Errors/AppErrors")
const asyncHandler = require("./async.handler")

class Bcrypt_helper_class {
  checkPasswordService = asyncHandler(
    async (plainpasword, hash)=>{
       
        const match = bcrypt.compareSync(plainpasword, hash);
        if (!match) 
          throw new AppError("", "Password not match", "Password is not match");
        return match;
    }
  )

}

const bcryptHelper = new Bcrypt_helper_class();
module.exports = bcryptHelper;
