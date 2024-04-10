const product=require('../schema/product')
class ProductController{
    static async Product(
        product_type,u_id
    ){
        const pro=await new product({
            product_type,
            u_id
        }).save()
        return pro
    }
    static async Phone(
        u_id,phone_name,phone_type,phone_price
    ){
        const phone=await product.findOneAndUpdate({u_id},
            {$push:{'product.0.phone':{
                phone_name,
                phone_type,
                phone_price
            }}})
            return phone
    }
    static async PhoneDelete(
        u_id,phone_name,phone_type,phone_price
    ){
        const phdel=await product.findOneAndUpdate({u_id},
            {$pull:{'product.0.phone':{
                phone_name,
                phone_type,
                phone_price 
            }}})
            return phdel
    }

    static async Laptop(
        u_id,laptop_price,laptop_name,laptop_type
    ){
        const laptop=await product.findOneAndUpdate({u_id},
            {$push:{'product.0.laptop':{
                
               laptop_price,
               laptop_name,
               laptop_type
            }}})
            return laptop
    }

    static async LaptopDelete(
        u_id,laptop_name,laptop_type,laptop_price
    ){
        const lapdel=await product.findOneAndUpdate({u_id},
            {$pull:{'product.0.laptop':{
            laptop_name,laptop_type,laptop_price
            }}})
            return lapdel
    }

}
module.exports=ProductController
