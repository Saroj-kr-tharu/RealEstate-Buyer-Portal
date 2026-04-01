const CURD_REPO = require("./curd.repo");
const { User } = require("../models/index");


const {asyncHandler} = require("../utlis/index")

class UserREpo extends CURD_REPO {
  constructor() {
    super(User);
  }

  getBydata = asyncHandler ( async(data) =>{
      const res = await this.model.findOne({ where: data });
      return res;
  } )
  
  getByEmail = asyncHandler ( async(email) =>{
      const res = await User.findOne({
        where: { email },
      });
      return res;
  } )





}

const userRepo = new UserREpo();

module.exports = userRepo;
