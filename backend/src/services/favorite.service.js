const CurdService = require('./curdService')
const  FAV_REPO = require('../repository/favorite.repo')
const { ServiceError,asyncHandler, JwtHelper} = require('../utlis/index');
const {ServerErrosCodes} = require('../utlis/https.codes');
 const  PRO_SVC = require('./property.service')


class FavoriteService extends CurdService {
    constructor(){
        super(FAV_REPO)
    }

    like= asyncHandler(
          async (token, id) => {
            // 1. check token and verify buyer 
            const userInfo = await JwtHelper.verifyToken(token);
            if(userInfo?.data?.role !== "BUYER") 
                throw new ServiceError("", "You are not BUYER", "You are not BUYER", ServerErrosCodes.NOT_IMPLEMENTED);

            // 2. property exist
            const proInfo = await PRO_SVC.getById(id)
            if(!proInfo) 
                throw new ServiceError("", "Properties is not Found", "Properties is not Found", ServerErrosCodes.NOT_IMPLEMENTED);

            // 3. check if same id is liked by same user 
            const favInfo = await FAV_REPO.getBydata({userId:userInfo?.data?.id , propertyId: id });
            if(favInfo) 
                throw new ServiceError("", "Property is already like by User", "Property is already like by User", ServerErrosCodes.NOT_IMPLEMENTED);

            // 4. insteat 
            const res = await FAV_REPO.create({userId:userInfo?.data?.id , propertyId: id });
            return res; 
             
         }
        
    )

    dislike= asyncHandler(
          async (token, id) => {
            // 1. check token and verify buyer 
            const userInfo = await JwtHelper.verifyToken(token);
            if(userInfo?.data?.role !== "BUYER") 
                throw new ServiceError("", "You are not BUYER", "You are not BUYER", ServerErrosCodes.NOT_IMPLEMENTED);

            // 2. property exist
            const proInfo = await PRO_SVC.getById(id)
            if(!proInfo) 
                throw new ServiceError("", "Properties is not Found", "Properties is not Found", ServerErrosCodes.NOT_IMPLEMENTED);

            // 3. check if same id is liked by same user 
            const favInfo = await FAV_REPO.getBydata({userId:userInfo?.data?.id , propertyId: id });
            if(!favInfo) 
                throw new ServiceError("", "Property is not liked by User", "Property is not liked by User", ServerErrosCodes.NOT_IMPLEMENTED);

            // 4. insteat 
            const res = await FAV_REPO.deleteBydata({userId:userInfo?.data?.id , propertyId: id });
            return res; 
             
         }
        
    )

    getallFavoriate= asyncHandler(
          async (token) => {
            // 1. check token and verify buyer 
            const userInfo = await JwtHelper.verifyToken(token);
            if(userInfo?.data?.role !== "BUYER") 
                throw new ServiceError("", "You are not BUYER", "You are not BUYER", ServerErrosCodes.NOT_IMPLEMENTED);

           
            // 4. insteat 
            const res = await FAV_REPO.getBydata({userId:userInfo?.data?.id });
            return res; 
             
         }
        
    )

   
}

const favoriteService= new FavoriteService()
module.exports = favoriteService;