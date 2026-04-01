const CURD_REPO = require("./curd.repo");
const { Favourite } = require("../models/index");


const {asyncHandler} = require("../utlis/index")

class FavoriteRepo extends CURD_REPO {
  constructor() {
    super(Favourite);
  }

  getBydata = asyncHandler ( async(data) =>{
      const res = await this.model.findOne({ where: data });
      return res;
  } )
  


}

const favoriteRepo = new FavoriteRepo();
module.exports = favoriteRepo;
