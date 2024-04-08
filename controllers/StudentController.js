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

}
module.exports=StudentController