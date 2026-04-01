const CurdService = require('./curdService')
const  PRO_REPO = require('../repository/property.repo')
const { ServiceError,asyncHandler, JwtHelper} = require('../utlis/index');
const {ServerErrosCodes} = require('../utlis/https.codes');


class PropertyService extends CurdService {
    constructor(){
        super(PRO_REPO)
    }

    addProperty= asyncHandler(
          async (data, token ) => {
            // 1. get the userinfo 
            const userInfo = await JwtHelper.verifyToken(token);

            // 2. check the role it should be agent only 
            // console.log("User info => ", userInfo)
            if(userInfo?.data?.role !== "AGENT") 
                throw new ServiceError("", "You are not Agent", "You are not Agent", ServerErrosCodes.NOT_IMPLEMENTED);

            

            // 3. get data and insert into the db 
            const res = await PRO_REPO.create({...data, createdBy:userInfo?.data?.id }); 
            return res; 
         }
    )

    deleteProperty= asyncHandler(
          async (id, token ) => {
            
            // 1. get the userinfo 
            const userInfo = await JwtHelper.verifyToken(token);

            // 2. check the role it should be agent only 
            // console.log("User info => ", userInfo)
            if(userInfo?.data?.role !== "AGENT") 
                throw new ServiceError("", "You are not Agent", "You are not Agent", ServerErrosCodes.NOT_IMPLEMENTED);

            // 3. check the property belongs to that user or not 
            const proInfo = await PRO_REPO.getById(id)
    
            if(!proInfo) 
                throw new ServiceError("", "Properties is not Found", "Properties is not Found", ServerErrosCodes.NOT_IMPLEMENTED);

            // 3. delete the propert from db 
            const res = await PRO_REPO.delete({ createdBy:userInfo?.data?.id, id }); 
            return res; 
         }
    )
    update= asyncHandler(
          async (id, token, data  ) => {
            
            // 1. get the userinfo 
            const userInfo = await JwtHelper.verifyToken(token);

            // 2. check the role it should be agent only 
            // console.log("User info => ", userInfo)
            if(userInfo?.data?.role !== "AGENT") 
                throw new ServiceError("", "You are not Agent", "You are not Agent", ServerErrosCodes.NOT_IMPLEMENTED);

            // 3. check the property belongs to that user or not 
            const proInfo = await PRO_REPO.getById(id)
    
            if(!proInfo) 
                throw new ServiceError("", "Properties is not Found", "Properties is not Found", ServerErrosCodes.NOT_IMPLEMENTED);

            // 3. delete the propert from db 
            const res = await PRO_REPO.updateById(data, id ); 
            return res; 
         }
    )


    getAllByUserId= asyncHandler(
          async ( token ) => {
            // 1. get the userinfo 
            const userInfo = await JwtHelper.verifyToken(token);
          
            // 3. check the property belongs to that user or not 
            const proInfo = await PRO_REPO.getByUserId(userInfo?.data?.id)
            return proInfo;
         }
    )
    
    getById= asyncHandler(
          async ( id ) => { 
            const proInfo = await PRO_REPO.getById(id)
            return proInfo;
         }
    )
    getAll= asyncHandler(
          async () => { 
            const proInfo = await PRO_REPO.getAll()
            return proInfo;
         }
    )
}

const propertyService= new PropertyService()
module.exports = propertyService;