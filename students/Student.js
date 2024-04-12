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
    },
    sports:[{
        type:String
    }],
    cit:[{
        os:{type:Number},
        dm:{type:Number},
        ds:{type:Number}

    }],
})
module.exports=mongoose.model('Student',student)