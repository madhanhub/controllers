const express = require('express')
const app=express()
const morgan=require('morgan')
const mongoose= require('mongoose')
const bodyParser = require('body-parser')
const path= require('path')
const axios=require('axios')
const dotenv=require('dotenv').config()
// dotenv.config()
const multer=require('multer')

const jsonwebtoken=require('jsonwebtoken')
const user=require('./schema/User')
const product = require('./schema/product')
const student=require('./students/Student')
const company=require('./schema/Company')
const sales=require('./schema/Sales')
const UserController = require('./controllers/UserController')
const SalesController = require('./controllers/SalesController')
const CompanyController = require('./controllers/CompanyController')
const ProductController = require('./controllers/ProductController')
const userController = new user();


const authorization = require('./function/auth')
const cors= require('./function/cors')
const upload= require('./function/upload_images')
const { title } = require('process')
app.use(express.json())
app.use(cors)
app.use(bodyParser.json())
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

app.post('/userLogin',async(req,res)=>{
	console.log(req.body)
	try{
		
		const {email,password}=req.body
		const userLogin=await UserController.userlogin(
			email,
			password
	)
		if (userLogin) {
			{
				let token = await jsonwebtoken.sign({ id: userLogin.id,user_name:userLogin.user_name,email:userLogin.email}, process.env.SECRET)
				res.setHeader('token', token)
				res.setHeader('user_name', userLogin.user_name)
				res.setHeader('email', userLogin.email)
			
				res.status(200).json({
					success: true,
					message: 'successfully logged_in',
					data: token,
				})
				console.log(token)
			}
		} else {
			
		 	res
		 		.status(400)
		 		.json({ success: false, message: 'email or password invalid ' })
		 }
		 
		
	} catch (error) {
		res.status(500).json({ success: false, message: error.message, error })
		console.log(error)
	}

})


app.post('/user/list',authorization ,async(req,res)=>{
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

app.post('/user/product',authorization,async(req,res)=>{
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

app.post('/user/delete',authorization,async(req,res)=>
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

app.post('/user/product/delete',authorization,async(req,res)=>
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

app.post('/user/labels',authorization,async(req,res)=>{
	try{
		const{_id,labels,label,title}=req.body
		const Label=await UserController.UserLabels(
			_id,labels,label,title
		)
			res.status(200).json({message:'success',data:Label})
		}catch(error){
			res.status(500).json({message:'failed'})
		}
})

app.post('/labels/delete',authorization,async(req,res)=>{
	try{
		const{_id,labels,label,title}=req.body
		const labdel=await UserController.Labdel(
			_id,labels,label,title
		)
			res.status(200).json({message:'success',data:labdel})
	}catch(error){
		res.status(500).json({message:'failed'})

	}
})

app.post('/label/iscomplete',authorization,async(req,res)=>{
	try{
		const{_id,labels,label}=req.body
		const iscomplete=await UserController.Iscomplete(
			_id,labels,label
		)
			res.status(200).json({message:'success',data:iscomplete})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/sales',async(req,res)=>{
	try{
		const{sales_count,phone_sales,laptop}=req.body
		const sale=await SalesController.Sales(
			sales_count,
			phone_sales,
			laptop	
		)
		res.status(200).json({message:'success',data:sale})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})
app.post('/sales/phone',async(req,res)=>{
	try{
		const{_id,phone_name,phone_amount}=req.body
		const phone=await SalesController.Phone(
			_id,
			phone_name,
			phone_amount
		)
		
		res.status(200).json({message:'success',data:phone})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})
app.post('/sales/phone/delete',async(req,res)=>{
	try{
		const{_id,phone_name,phone_amount}=req.body
		const phdel=await SalesController.Phdel(
			_id,phone_name,phone_amount
		)
		res.status(200).json({message:'success',data:phdel})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/sales/laptop',async(req,res)=>{
	try{
		const { _id,laptop_name,laptop_price}=req.body
		const laptop=await SalesController.Laptop(
			_id,
			laptop_name,
			laptop_price
		)
		res.status(200).json({message:'success',data:laptop})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/sales/laptop/delete',async(req,res)=>{
	try{
		const{_id,laptop_name,laptop_price}=req.body
		const ltdel=await SalesController.Ltdel(
			_id,laptop_name,laptop_price
		)
		res.status(200).json({message:'success',data:ltdel})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/company',async(req,res)=>{
	try{
		const{name,address,products}=req.body
		const company=await CompanyController.Company(
			name,
			address,
			products
	)
		res.status(200).json({message:'success',data:company})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/company/product',async(req,res)=>{
	try{
		const{_id,mobile,laptop}=req.body
		const pro=await CompanyController.Pro(
			_id,mobile,laptop
		)
		res.status(200).json({message:'success',data:pro})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})
app.post('/company/product/delete',async(req,res)=>{
	try{
		const{_id,mobile,laptop}=req.body
		const prodel=await CompanyController.Prodel(
			_id,mobile,laptop
		)
			res.status(200).json({message:'success',data:prodel})
		}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/products',async(req,res)=>{
	try{
		const{product_type}=req.body
		const pro=await ProductController.Product(
			product_type
		)
			
		
		res.status(200).json({message:'success',data:pro})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/product/phone',async(req,res)=>{
	try{
		const{ _id,phone_name,phone_type,phone_price}=req.body
		const productes=await ProductController.Phone(
			_id,phone_name,phone_type,phone_price
		)
			res.status(200).json({message:'success',data:productes})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/product/phone/delete',async(req,res)=>{
	try{
		const{_id,phone_name,phone_type,phone_price}=req.body
		const phdel=await ProductController.PhoneDelete(
				_id,
				phone_name,
                phone_type,
                phone_price
		)
			res.status(200).json({message:'success',data:phdel})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/product/laptop',async(req,res)=>{
	try{
		const{_id,laptop_price,laptop_name,laptop_type}=req.body
		const laptop=await ProductController.Laptop(
			_id,
			laptop_price,
			laptop_name,
			laptop_type
		)
			res.status(200).json({message:'success',data:laptop})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/product/laptop/delete',async(req,res)=>{
	try{
		const{_id,laptop_name,laptop_type,laptop_price}=req.body
		const lapdel=await ProductController.LaptopDelete(
				_id,
				laptop_name,
				laptop_type,
				laptop_price,
		)
			res.status(200).json({message:'success',data:lapdel})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})
app.post('/student',async(req,res)=>{
try{
	const stu=new student({
		name:req.body.name,
		rollno:req.body.rollno,
		dep:req.body.dep
	}).save()
	res.status(200).json({message:'success',data:stu})
}catch(error){
	res.status(500).json({message:'failed'})	
}
})
