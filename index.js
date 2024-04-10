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
const StudentController=require('./controllers/StudentController')
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
				let token = await jsonwebtoken.sign({id:userLogin.id,user_name:userLogin.user_name,email:userLogin.email}, process.env.SECRET)
				res.setHeader('token', token)
				res.setHeader('id',userLogin.id)
				res.setHeader('user_name', userLogin.user_name)
				res.setHeader('email', userLogin.email)
			
				res.status(200).json({
					success: true,
					message: 'successfully logged_in',
					data: token,
				})
				
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


app.post('/user/list',authorization,async(req,res)=>{
	console.log(req.id)
	try{
		const _id=req.id
		const list=await UserController.List(
			_id
		)
		console.log(list)
		res.status(200).json({message:'success',data:list})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/user/product',authorization,async(req,res)=>{
	
	try{
		
		const {products}=req.body
		
		const pro=await UserController.Product(
			req.id,
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
		const _id=req.id
		const del=await UserController.Delete(
			_id
			
		)
		res.status(200).json({message:'success',data:del})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/user/statu',authorization,async(req,res)=>{
	try{
		const _id=req.id
		const sts=await UserController.Status(
			_id
		)
			res.status(200).json({message:'success',data:sts})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})
app.post('/user/product/delete',authorization,async(req,res)=>
{
	try{
		const{products}=req.body
		const prodel=await UserController.Prodel(
			req.id,
			products
		)
		res.status(200).json({message:'success',data:prodel})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/user/labels',authorization,async(req,res)=>{
	try{
		const{labels,label,title}=req.body
		const Label=await UserController.UserLabels(
			req.id,labels,label,title
		)
			res.status(200).json({message:'success',data:Label})
		}catch(error){
			res.status(500).json({message:'failed'})
		}
})

app.post('/labels/delete',authorization,async(req,res)=>{
	try{
		const{labels,label,title}=req.body
		const labdel=await UserController.Labdel(
			req.id,labels,label,title
		)
			res.status(200).json({message:'success',data:labdel})
	}catch(error){
		res.status(500).json({message:'failed'})

	}
})

app.post('/label/iscomplete',authorization,async(req,res)=>{
	try{
		const{labels,label}=req.body
		const iscomplete=await UserController.Iscomplete(
			req.id,labels,label
		)
			res.status(200).json({message:'success',data:iscomplete})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/sales',async(req,res)=>{
	try{
		const{user_name,sales_count,phone_sales,laptop,email,u_id}=req.body
		const sale=await SalesController.Sales(
			
			
			user_name,
			sales_count,
			phone_sales,
			laptop	,
			email,
			u_id
		)
		res.status(200).json({message:'success',data:sale})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/sales/list',authorization,async(req,res)=>{
	try{
		const u_id=req.u_id
		const list=await SalesController.S_List(u_id)
		res.status(200).json({message:"success",data:list})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/sales/phone',authorization,async(req,res)=>{
	try{
		const{phone_name,phone_amount}=req.body
		const phone=await SalesController.Phone(
			req.u_id,
			phone_name,
			phone_amount,	
		)
		
		res.status(200).json({message:'success',data:phone})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})
app.post('/sales/phone/delete',authorization,async(req,res)=>{
	try{
		const{phone_name,phone_amount}=req.body
		const phdel=await SalesController.Phdel(
			req.u_id,phone_name,phone_amount
		)
		res.status(200).json({message:'success',data:phdel})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/sales/laptop',authorization,async(req,res)=>{
	try{
		const {laptop_name,laptop_price}=req.body
		const laptop=await SalesController.Laptop(
			req.u_id,
			laptop_name,
			laptop_price
		)
		res.status(200).json({message:'success',data:laptop})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/sales/laptop/delete',authorization,async(req,res)=>{
	try{
		const{laptop_name,laptop_price}=req.body
		const ltdel=await SalesController.Ltdel(
			req.u_id,laptop_name,laptop_price
		)
		res.status(200).json({message:'success',data:ltdel})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/company',async(req,res)=>{
	try{
		const{name,address,products,b_name,email,password,u_id}=req.body
		const company=await CompanyController.Company(
			name,
			address,
			products,
			b_name,
			email,
			password,
			u_id,
	)
		res.status(200).json({message:'success',data:company})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/company/login',async(req,res)=>{
	console.log(req.body)
	try{
		
		const {email,password}=req.body
		const c_login=await company.findOne({
			email,
			password
		})
		if (c_login) {
			{
				let token = await jsonwebtoken.sign({id:c_login.id,b_name:c_login.b_name,email:c_login.email,u_id:c_login.u_id}, process.env.SECRET)
				res.setHeader('token', token)
				res.setHeader('id',c_login.id)
				res.setHeader('b_name', c_login.b_name)
				res.setHeader('email', c_login.email)
				res.setHeader('u_id',c_login.u_id)
				res.status(200).json({
					success: true,
					message: 'successfully logged_in',
					data: token,
				})
				
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


app.post('/company/product',authorization,async(req,res)=>{
	try{
		const{mobile,laptop}=req.body
		const pro=await CompanyController.Pro(
			req.id,
			mobile,
			laptop
		)
		res.status(200).json({message:'success',data:pro})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})
app.post('/company/product/delete',authorization,async(req,res)=>{
	try{
		const{mobile,laptop}=req.body
		const prodel=await CompanyController.Prodel(
			req.id,
			mobile,
			laptop
		)
			res.status(200).json({message:'success',data:prodel})
		}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/products',async(req,res)=>{
	try{
		const{product_type,u_id}=req.body
		const pro=await ProductController.Product(
			product_type,
			u_id
		)	
		res.status(200).json({message:'success',data:pro})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/product/phone',authorization,async(req,res)=>{
	try{
		const{ phone_name,phone_type,phone_price}=req.body
		const productes=await ProductController.Phone(
			req.u_id,phone_name,phone_type,phone_price
		)
			res.status(200).json({message:'success',data:productes})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/product/phone/delete',authorization,async(req,res)=>{
	try{
		const{phone_name,phone_type,phone_price}=req.body
		const phdel=await ProductController.PhoneDelete(
				req.u_id,
				phone_name,
                phone_type,
                phone_price
		)
			res.status(200).json({message:'success',data:phdel})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/product/laptop',authorization,async(req,res)=>{
	try{
		const{laptop_price,laptop_name,laptop_type}=req.body
		const laptop=await ProductController.Laptop(
			req.u_id,
			laptop_price,
			laptop_name,
			laptop_type
		)
			res.status(200).json({message:'success',data:laptop})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/product/laptop/delete',authorization,async(req,res)=>{
	try{
		const{laptop_name,laptop_type,laptop_price}=req.body
		const lapdel=await ProductController.LaptopDelete(
				req.u_id,
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
	const{name,rollno,dep,sports}=req.body
	const stu=await StudentController.Student(
		name,
		rollno,
		dep,
		sports
	)
	
	res.status(200).json({message:'success',data:stu})
}catch(error){
	res.status(500).json({message:'failed'})	
}
})

app.post('/student/login',async(req,res)=>{
	try{
		const{rollno}=req.body
		const login=await StudentController.S_Login(rollno)
		if (login) {
			{
				let token = await jsonwebtoken.sign({id:login.id,rollno:login.rollno}, process.env.SECRET)
				res.setHeader('token', token)
				res.setHeader('id',login.id)
				res.setHeader('rollno',login.rollno),

				res.status(200).json({
					success: true,
					message: 'successfully logged_in',
					data: token,
				})	
			}	
		}
		
		res.status(200).json({message:'success',data:login})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/student/delete',authorization,async(req,res)=>{
	try{
		const _id=req.id
		const del=await StudentController.StudentDel(
			_id
		)
			res.status(200).json({message:'success',data:del})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})
app.post('/student/sports',authorization,async(req,res)=>{
	try{
		const {sports}=req.body
		const sportes=await StudentController.Sports(
			req.id,
			sports
		)
			res.status(200).json({message:'success',data:sportes})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/student/sportd/delete',authorization,async(req,res)=>{
try{
	const {sports}=req.body
	const sdel=await StudentController.D_Sports(
		req.id,
		sports
	)
		res.status(200).json({message:'success',data:sdel})
}catch(error){
	res.status(500).json({message:'failed'})
}
})
app.post('/student/list',authorization,async(req,res)=>{
	try{
		const _id=req.id
		const list=await StudentController.S_List(
			_id)
		res.status(200).json({message:'success',data:list})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})


