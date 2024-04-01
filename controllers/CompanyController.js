const company= require('../schema/Company')

class CompanyController{

    static async Company(
        name,address,product
    ){
        const Companies=await new company({
            name,
            address,
            product  
        }).save()
        return Companies
    }
    static async Pro(
        _id,mobile,laptop
    ){
        const pro=await company.findOneAndUpdate({
            _id
        },{$push:{'products.0.mobile':mobile,'products.0.laptop':laptop}})
    return pro
    }
    
}
module.exports=CompanyController