const sales = require('../schema/Sales')

class SalesController{
    static async Sales(
        sales_count,
        phone_sales,
        laptop
    ){
        try
    {
        const sale=await new sales({
            sales_count,
            phone_sales,
            laptop
    }).save()
    return sale
    }catch(error){}
}
    static async Phone(
        _id,phone_name,phone_amount
    ){
        const phone=await sales.findOneAndUpdate({
            _id
        },{$push:{phone_sales:{phone_name,
        phone_amount}}})
        return phone
    }
   
    static async Laptop(
        _id,laptop_name,laptop_price
    ){
        const laptop=await sales.findOneAndUpdate({_id},
            {$push:{laptop:{laptop_name,laptop_price}}})
            return laptop
    }

}    
module.exports=SalesController
