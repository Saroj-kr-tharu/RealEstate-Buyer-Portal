
const { ZodError }       = require('zod');

const { SignupSchema, LoginSchema } = require('../schemas/user.schema');
const {ClientErrorsCodes} = require('../utlis/https.codes')
const {responseHandler} = require('../utlis/index')


class UserMiddleware {

    // Reusable Zod parser 
     #validate(schema, req, res, next) {
      try {
        req.body = schema.parse(req.body);
        next();
      } catch (err) {
        if (err instanceof ZodError || err?.name === 'ZodError') {
          const issues = err.issues ?? err.errors ?? [];
          const messages = issues
            .map((e) => `${e.path.join('.') || 'field'}: ${e.message}`)
            .join(', ');
          return responseHandler.error(res, messages, ClientErrorsCodes.BAD_REQUEST);
        }

        next(err); 
      }
    }

    signupAndLogin = (req, res, next) => {
      const isSignup = req.path.includes('signup');
      const schema   = isSignup ? SignupSchema : LoginSchema;
      this.#validate(schema, req, res, next);
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
