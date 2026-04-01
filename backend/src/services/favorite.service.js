const CurdService = require('./curdService')
const  USER_REPO = require('../repository/user.repo')
const { ServiceError,asyncHandler} = require('../utlis/index');
const {ServerErrosCodes} = require('../utlis/https.codes');

class FavoriteService extends CurdService {
    constructor(){
        super(USER_REPO)
    }

    getByData= asyncHandler(
          async (userId) => {
            const res = await USER_REPO.getBydata({id:  userId});
            return res;
         }
        
    )

   
}

const favoriteService= new FavoriteService()
module.exports = favoriteService;