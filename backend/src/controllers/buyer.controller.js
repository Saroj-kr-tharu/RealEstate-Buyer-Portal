const {favService} = require('../services/index');
const {SucessCode} = require('../utlis/https.codes')
const {asyncHandler, responseHandler} = require("../utlis/index")

class BuyerController { 

    like = asyncHandler( 
        async (req,res) => {
            const id = req?.params.id;
            const token = req?.headers['x-access-token'];
            const response = await favService.like(token, id);
            return responseHandler.success(res, response, "Successfully Added To Favorite", SucessCode.CREATED)
        } 
    );
    
    dislike = asyncHandler( 
        async (req,res) => {
            const id = req?.params.id;
            const token = req?.headers['x-access-token'];
            const response = await favService.dislike(token, id);
            return responseHandler.success(res, response, "Successfully removed From Favorite", SucessCode.CREATED)
        } 
    );

    favorite = asyncHandler( 
        async (req,res) => {
            const token = req?.headers['x-access-token'];
            const response = await favService.getallFavoriate( token);
            return responseHandler.success(res, response, "Successfully Fetched All Favorite", SucessCode.CREATED)
        } 
    );
   
   

}



const buyerController = new BuyerController();
module.exports = buyerController;