const express = require('express')
const app=express()
const morgan=require('morgan')
const mongoose= require('mongoose')
const path= require('path')
const axios=require('axios')
const dotenv=require('dotenv').config()
// dotenv.config()
const multer=require('multer')
const jsonwebtoken=require('jsonwebtoken')
const user=require('./schema/User')
const product = require('./schema/product')
const company=require('./schema/Company')
const sales=require('./schema/Sales')
const UserController = require('./controllers/UserController');
const userController = new user();


const authorization = require('./function/auth')
const cors= require('./function/cors')
const upload= require('./function/upload_images')
const { title } = require('process')
app.use(express.json())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))


app.listen(5555, () => {
	console.log('SERVER Run')

	mongoose.set('strictQuery', false)
	//connecting mongodb
	mongoose
		.connect(`mongodb+srv://madhan91101:Mcabca%409@klncollege.ab2hmvj.mongodb.net/`
			//process.env.MYDB_CONNECTION,
		// 	, {
		// 	useNewUrlParser: true,
		// 	useUnifiedTopology: true,
)
		.then(() => {
			conn = mongoose.connection
			console.log('database Connected')
		})
		.catch((error) => {
			console.log('Error connecting to MongoDB:', error)
		})
})
app.get('/',async(req,res)=>{
    res.json('welcome')
})

app.post('/user/add',async(req,res)=>{
    try{
		const {user_name,mobile,email,address,password,products,label,} = req.body
        const useradd=await UserController.addUser(
            user_name,
          mobile,
          email,
          address,
          password,
           products,
          label,
        )
        res.status(200).json({message:'success',data:useradd})
    }catch(error){
        res.status(500).json({message:'failed'})
    }

})

app.post('/user/login',async(req,res)=>{
	try{
		const {email,password}=req.body
		const userLogin=await UserController.userlogin(
			email,
			password
		)
		
		res.status(200).json({message:'success',data:userLogin})
	}catch(error){
		res.status(200).json({message:'failed'})
	}
})

app.post('/user/list',async(req,res)=>{
	try{
		const{_id}=req.body
		const list=await UserController.List(
			_id
		)
		res.status(200).json({message:'success',data:list})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/user/product',async(req,res)=>{
	try{
		const{_id,products}=req.body
		const pro=await UserController.Product(
			_id,
			products
		)
			res.status(200).json({message:'success',data:pro})

	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/user/delete',async(req,res)=>
{
	try{
		const {_id}=req.body
		const del=await UserController.Delete(
			_id
		)
		res.status(200).json({message:'success',data:del})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/user/product/delete',async(req,res)=>
{
	try{
		const{_id,products}=req.body
		const prodel=await UserController.Prodel(
			_id,products
		)
		res.status(200).json({message:'success',data:prodel})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})