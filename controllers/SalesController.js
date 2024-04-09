const sales = require('../schema/Sales')

class SalesController{
    static async Sales(
       user_name,
        sales_count,
        phone_sales,
        laptop,
        email,
        u_id
    ){
        try
    {
        const sale=await new sales({
            user_name,
            sales_count,
            phone_sales,
            laptop,
            email,
            u_id

    }).save()
    return sale
    }catch(error){}
}
    static async Phone(
        u_id,phone_name,phone_amount
    ){
        const phone=await sales.findOneAndUpdate({
            u_id
        },{$push:{phone_sales:{phone_name,
        phone_amount}}})
        return phone
    }
   
    static async Laptop(
        u_id,laptop_name,laptop_price
    ){
        const laptop=await sales.findOneAndUpdate({u_id},
            {$push:{laptop:{laptop_name,laptop_price}}})
            return laptop
    }
    static async Phdel(
        u_id,phone_name,phone_amount
    ){
        const phdel=await sales.findOneAndUpdate({u_id},
            {$pull:{phone_sales:{phone_name,phone_amount}}})
            return phdel
    }
    static async Ltdel(
        u_id,laptop_name,laptop_price
    ){
        const ltdel=await sales.findOneAndUpdate({u_id},
            {$pull:{laptop:{laptop_name,laptop_price}}})
            return ltdel
    }
    static async S_List(
        u_id
    ){
        const list=await sales.findOne(
            {u_id}
        )
        return list
    }

}    
module.exports=SalesController
