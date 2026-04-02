const CURD_REPO = require("./curd.repo");
const { Favourite,  Property, User } = require("../models/index");


const {asyncHandler} = require("../utlis/index")

class FavoriteRepo extends CURD_REPO {
  constructor() {
    super(Favourite);
  }

  getBydata = asyncHandler ( async(data) =>{
      const res = await this.model.findAll({ 
        where: data,
        include: [
        {
          model: Property, 
          attributes: ['id','title', 'price', 'location', 'imageUrl', 'description']
        },
        {
          model: User, 
          attributes: ['username', 'email']
        }
      ]
      });
      return res;
  } )
  
  deleteBydata = asyncHandler ( async(data) =>{
      const res = await this.model.destroy({ where: data });
      return res;
  } )


}

const favoriteRepo = new FavoriteRepo();
module.exports = favoriteRepo;
