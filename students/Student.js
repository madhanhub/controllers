const mongoose=require('mongoose')
const student=new mongoose.Schema({
    name:{
        type:String,
    },
    rollno:{
        type:Number
    },
    dep:{
        type:String
    }
})
module.exports=mongoose.model('Student',student)