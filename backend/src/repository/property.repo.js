const CURD_REPO = require("./curd.repo");
const { Property } = require("../models/index");


const {asyncHandler} = require("../utlis/index")

class PropertyRepo extends CURD_REPO {
  constructor() {
    super(Property);
  }

  delete = asyncHandler(async (data) => {
    const res = await this.model.destroy({ where: data });
    return res;
  })
  
  getByUserId = asyncHandler(async (UserId) => {
    const res = await this.model.findAll({ where: {
       createdBy: UserId
    } });
    return res;
  })
  


}

const propertyRepo = new PropertyRepo();

module.exports = propertyRepo;
