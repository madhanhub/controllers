const mongoose=require('mongoose')
const total_sales=new mongoose.Schema({
    user_name:{
        type:String
    },
    u_id:{
        type:Number
    },
    email:{
        type:String
    },
    sales_count:{
        type:Number,
    },
    phone_sales:[{
        
        phone_name:String,
        phone_amount:Number,
        phone_buy:{
            type:Boolean,
        default:false},
    }],
    laptop:[{
        laptop_name:String,
        laptop_price:Number,
        laptop_buy:
        {   
        type:Boolean,
        default:true}
        
    }],
    
})
module.exports=mongoose.model('Sales',total_sales)