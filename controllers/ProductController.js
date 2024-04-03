const product=require('../schema/product')
class ProductController{
    static async Product(
        product_type
    ){
        const pro=await new product({
            product_type
        }).save()
        return pro
    }
    static async Phone(
        _id,phone_name,phone_type,phone_price
    ){
        const phone=await product.findOneAndUpdate({_id},
            {$push:{'product.0.phone':{
                phone_name,
                phone_type,
                phone_price
            }}})
            return phone
    }
    static async PhoneDelete(
        _id,phone_name,phone_type,phone_price
    ){
        const phdel=await product.findOneAndUpdate({_id},
            {$pull:{'product.0.phone':{
                phone_name,
                phone_type,
                phone_price 
            }}})
            return phdel
    }

    static async Laptop(
        _id,laptop_price,laptop_name,laptop_type
    ){
        const laptop=await product.findOneAndUpdate({_id},
            {$push:{'product.0.laptop':{
               _id, 
               laptop_price,
               laptop_name,
               laptop_type
            }}})
            return laptop
    }

    static async LaptopDelete(
        _id,laptop_name,laptop_type,laptop_price
    ){
        const lapdel=await product.findOneAndUpdate({_id},
            {$pull:{'product.0.laptop':{
               _id,laptop_name,laptop_type,laptop_price
            }}})
            return lapdel
    }

}
module.exports=ProductController
