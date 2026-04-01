
const {asyncHandler} = require("../utlis/index")

class CURD_REPO{
    constructor(model){
        this.model = model ;
    }
    
    create = asyncHandler ( async(data) =>{
        const res = await this.model.create(data);
        return res; 
    } )
    
    updateById = asyncHandler ( async(data,id) =>{
        const res = await this.model.update(data, { where : {id } } );
        return res ;
    } )
    
    delete = asyncHandler ( async(email) =>{
        const res = await this.model.destroy( { where: { email }, } );
        return res;
    } )
    
    getById = asyncHandler ( async(id) =>{
        const res = await this.model.findOne({
                where: {id},
            });
        return res; 
    } )
    
    getAll = asyncHandler ( async(email) =>{
        const res = await this.model.findAll();
            return res;
    } )
   
}

module.exports = CURD_REPO;