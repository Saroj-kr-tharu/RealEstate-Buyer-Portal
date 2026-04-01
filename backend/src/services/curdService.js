
const {asyncHandler} = require("../utlis/index")

class CurdService { 
    constructor(repo){
        this.repo = repo;
    }

    createService = asyncHandler ( async(data) =>{
        const res = await this.repo.create(data);
        return res; 
    } )
    
    deleteService = asyncHandler ( async(data) =>{
        const res = await this.repo.delete(data);
        return res; 
    } )
    
    updateService = asyncHandler ( async(data,id) =>{
        // console.log(`data => ${data} id => ${id}`)
        const res = await this.repo.updateById(data, id );
        return res; 
    } )
    
    getByIdService = asyncHandler ( async(data) =>{
        const res = await this.repo.getbyId(data);
        return res; 
    } )
    
    getAll = asyncHandler ( async() =>{
        const res = await this.repo.getAll();
        return res; 
    } )



}


module.exports = CurdService;