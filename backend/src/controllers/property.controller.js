const {proService} = require('../services/index');
const {SucessCode} = require('../utlis/https.codes')
const {asyncHandler, responseHandler} = require("../utlis/index")

class ProController { 

    add = asyncHandler( 
        async (req,res) => {
            const data = req?.body;
            const token = req?.headers['x-access-token'];
            const response = await proService.addProperty(data, token);
            return responseHandler.success(res, response, "Successfully Created Property", SucessCode.CREATED)
        } 
    );

    delete = asyncHandler( 
        async (req,res) => {
            const id = req?.params?.id;
            
            const token = req?.headers['x-access-token'];
            const response = await proService.deleteProperty(id, token);
            return responseHandler.success(res, response, "Successfully deleted Property", SucessCode.OK);
        } 
    );


    getAllByUserId = asyncHandler( 
        async (req,res) => {
            const token = req?.headers['x-access-token'];
            const response = await proService.getAllByUserId(token);
            return responseHandler.success(res, response, "Successfully getAll Property", SucessCode.OK);
        } 
    );

    getAll = asyncHandler( 
        async (req,res) => {
            const response = await proService.getAll();
            return responseHandler.success(res, response, "Successfully getAll Property", SucessCode.OK);
        } 
    );
    
    getById = asyncHandler( 
        async (req,res) => {
            const id = req?.params?.id;            
            const response = await proService.getById(id);
            return responseHandler.success(res, response, "Successfully get Property", SucessCode.OK);
        } 
    );
    
    update = asyncHandler( 
        async (req,res) => {
            const id = req?.params?.id;
            const data = req?.body; 
            const token = req?.headers['x-access-token'];
            const response = await proService.update(id, token,data);
            return responseHandler.success(res, response, "Successfully updated Property", SucessCode.OK);
        } 
    );

    
   

}



const proController = new ProController();
module.exports = proController;