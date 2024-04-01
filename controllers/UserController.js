const user=require('../schema/User')
class UserController {
    static async addUser(
      user_name,mobile,email,address,password,products,label
    ){
      try {
       
  
        const add =await new user({
          user_name,
          mobile,
          email,
          address,
          password,
           products,
          label,
        }).save()
      return  add
      } catch (error) {
        throw error
      }
    }

    static async userlogin(
        email,password
    ){
        try{
            const login=await user.findOne({
                email,
                password
            })
            return login
        }catch(error){

        }
    }

    static async List(
        _id
    ){
        try{
            const list=await user.findOne({
                _id
            })
            return list
        }catch(error){

        }
    }

    static async Product(
        _id,products
    ){
        try{
            const pro=await user.findOneAndUpdate({
                _id},{$push:{products}}
                
            )
            return pro
        }catch(error){}
    }
    static async Delete(
        _id
    ){
        try{
            const del=await user.findOneAndDelete(
                {
                    _id
                }
            )
            return del
        }catch(error){}
    }

    static async Prodel(
        _id,products
    ){
        try{
            const prodel=await user.findOneAndUpdate({
                _id
            },{$pull:{products}})
            return prodel
        }catch(error){}
    }

    static async UserLabels(
        _id,labels,label,title
    ){
        try{
            const Label=await user.findOneAndUpdate({
                _id
            },{$push:{labels:{
                
                label,title
        }}},
        {new:true})
            return Label
        }catch(error){

        }
    }
    static async Labdel(
        _id,labels,label,title
    ){
        try{
            const labdel=await user.findOneAndUpdate({
                _id
            },{$pull:{labels:{label,title}}},
            {new:true})
            return labdel
        }catch(error){

        }
        
    }
    static async Iscomplete(
        _id,labels,label
    ){
        try{
            const iscomplete=await user.findOneAndUpdate({_id,'labels.label':label},
                {$set:{'labels.$.iscomplete':true}},
                {new:true})
                return iscomplete
        }catch(error){
            
        }
    }
}
module.exports=UserController