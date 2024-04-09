const mongoose=require('mongoose')
const validator=require('../validator')
const company=new mongoose.Schema({
    name:{
        type:String,
        validate: {
            validator: validator.validateCName,
            message: 'Invalid name. Name should only contain alphabets.',
          },
    },
    u_id:{
        type:Number
    },
    b_name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    address:{
        type:String,
    },
    products:[{
        mobile:[{
            type:String
        }],
        laptop:[{
            type:String
        }],
    }]
})
module.exports=mongoose.model('Company',company)