const student=require ('../students/Student')
class StudentController{
    static async Student(
        name,rollno,dep
    ){
        const stu=await new student({
            name,
            dep,
            rollno
        }).save()
        return stu
    }
    static async S_Login(
        rollno
    ){
        const login=await student.findOne({
            rollno
    })
    return login
    }
    

    static async StudentDel(
        _id
    ){
        const del=await student.findOneAndDelete({
            _id
        })
        return del
    }
    static async Sports(
        _id,sports
    ){
        const Sport=await student.findOneAndUpdate({_id},
            {$push:{sports}})
            return Sport
    }
    static async D_Sports(
        _id,sports
    ){
        const sdel=await student.findOneAndUpdate({_id},
            {$pull:{sports}})
            return sdel
    }
    static async S_List(
        _id
    ){
        const list=await student.findOne({
            _id
        })
        return list
    }

}
module.exports=StudentController