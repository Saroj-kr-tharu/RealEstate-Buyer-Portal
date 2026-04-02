const CurdService = require('./curdService')
const  USER_REPO = require('../repository/user.repo')
const {BcryptHelper, JwtHelper, ServiceError,asyncHandler} = require('../utlis/index');
const {ServerErrosCodes} = require('../utlis/https.codes');

class userService extends CurdService {
    constructor(){
        super(USER_REPO)
    }

    getByData= asyncHandler(
          async (userId) => {
            const res = await USER_REPO.getBydata({id:  userId});
            return res;
         }
    )

    getByEmail= asyncHandler(
          async (email) => {
            const res = await USER_REPO.getBydata({email:  email});
            return res;
         }
    )

    
    loginService = asyncHandler (
        async(data, res) => {

            const {password, email} = data;
            const infoUser = await USER_REPO.getByEmail(email);
            // console.log("info => ", infoUser)
            const hashpassword = infoUser?.dataValues?.password

            if(!hashpassword) 
                throw new ServiceError( "","User is Not Found", "Email is Found", ServerErrosCodes.INTERNAL_SERVER_ERROR)
                
                const isValid = await BcryptHelper.checkPasswordService(password, hashpassword );
                
                if (!isValid)  throw new ServiceError("", "Password not match", "Password is not match", ServerErrosCodes.INTERNAL_SERVER_ERROR);
              


            // access token
            const token = await JwtHelper.createToken({...data, id: infoUser?.dataValues?.id,role: infoUser?.dataValues?.role});
            
            // refresh token 
            const refreshToken = await JwtHelper.createRefreshToken({email, id: infoUser?.dataValues?.id,});


            // update refresh token in db 
            await USER_REPO.updateById({refreshToken: refreshToken},infoUser?.dataValues?.id );
            

            res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                });

            const response = {
                email: data.email,
                id: infoUser?.dataValues?.id,
                role: infoUser?.dataValues?.role,
                username: infoUser?.dataValues?.username,
                jwt: token,
                isActive: infoUser?.dataValues?.isActive
            }
            
            return response;
        }
    )
    
    
    verifyToken = asyncHandler( 
        async(data) => {
            const user = await JwtHelper.verifyToken(data);

             if (!user)
                throw new ServiceError("", "Token is invalid or Expired",  );
                
            const infoUser = await USER_REPO.getByEmail(user.data.email);

           
            const response = {
                email: user.data.email,
                role: infoUser?.dataValues?.role,
                username: infoUser?.dataValues?.username,
                jwt: data,
            }
            
            return response;
        }
    )

    genRefreshToken = asyncHandler( async(data, res) => {
        const isvalid = await JwtHelper.verifyRefreshToken(data);
            if(!isvalid) throw new Error ('invalid refresh token ')
            if (!isvalid) throw new Error("Token is invalid or Expired");
            
            const infoUser = await USER_REPO.getById(isvalid.data.id); 
            
            
            if(!infoUser || infoUser?.dataValues?.refreshToken !== data) 
                    throw new Error("invalid user or refresh token");
                
            const user = infoUser?.dataValues;
             // refresh token 
            const refreshToken = await JwtHelper.createRefreshToken({email: user.email, id: user.id,});

           // access token
            const token = await JwtHelper.createToken({email: user.email ,id: user.id,role: user.role, username:user.username});

            // update refresh token in db 
            await USER_REPO.updateById({refreshToken: refreshToken},user.id );
            

            res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                });

        

            const response = {
                email: user.email,
                role: user.role,
                username: user.username,
                jwt: token,
            }
            
            return response;
    } )

    
    logout = asyncHandler ( async(data, res) =>{
        const user = await JwtHelper.verifyRefreshToken(data);
        if (!user)
            throw new Error("Token is invalid or Expired")
        // console.log("user => ", user)

         // update refresh token in db 
        await USER_REPO.updateById({refreshToken: null},user.data.id );
        res.clearCookie("refreshToken");

        return `Sucessfully Log out user ${user.data.id} `;
    } )
  
}

const userservice= new userService()
module.exports = userservice;