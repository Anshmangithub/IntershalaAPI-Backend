const { catchAsyncError } = require("../middlewares/catchAsyncError")
const Student = require("../models/studentSchema");
const Internship = require("../models/internshipSchema");
const Job = require("../models/jobSchema");
const ErorrHandler = require("../utils/ErorrHandler");
const { sendmail } = require("../utils/nodemailer");
const {sendtoken} = require("../utils/sendToken");
const imagekit = require("../utils/ImageKit").initImageKit();
const path  = require("path")

exports.homepage =  catchAsyncError(async (req ,res , next)=>{
    res.json({
        message : "Secure routes "
    })
})

exports.currentuser = catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).populate("jobs").populate("internships").exec()
    res.json({student})
})

exports.studentsignup =  catchAsyncError(async (req ,res , next)=>{

    const student  = await new Student(req.body).save();
    
    sendtoken(student , 201 , res)
})

exports.studentsignin =  catchAsyncError(async (req ,res , next)=>{

   const student = await Student.findOne({email : req.body.email}).select("+password").exec()
   
   if(!student) return next(new ErorrHandler("user is not found with this email address" , 404))

   const isMatch = student.comparePassword(req.body.password);

   if(!isMatch) return next(new ErorrHandler("wrong credential" , 500))


   sendtoken(student , 201 , res)
})


exports.studentsignout =  catchAsyncError(async (req ,res , next)=>{

  res.clearCookie("token");
  res.json({message : "succesfully signout "})
})

exports.studentsendmail = catchAsyncError(async (req ,res, next) =>{
    const student = await Student.findOne({email : req.body.email}).exec()

    if(!student){
        return next(new ErorrHandler("user with this email address is not exists" , 404))
    }

    const url = Math.floor(Math.random() * 9000 + 1000)
        
    
    sendmail(req , res , next , url)
  
        student.resetPasswordToken = `${url}`
        await student.save();
   
    res.json({message : "mail sent successfully"})
})


exports.studentforgetlink = catchAsyncError(async (req ,res, next) =>{
    const student = await Student.findOne({email : req.body.email}).exec()

    if(!student){
        return next(new ErorrHandler("user with this email address is not exists" , 404))
    }
    
    if(student.resetPasswordToken === req.body.otp){
        student.resetPasswordToken = "0"
        student.password = req.body.password 
        await student.save()
    }else{
        return next(new ErorrHandler("Invalid password reset link , please try again" , 404))
    }
    res.status(200).json({

        message : "password changed successfully"
    })
})



exports.studentresetpassword = catchAsyncError(async (req ,res, next) =>{
    const student = await Student.findById(req.params.id).exec()

        student.password = req.body.password 
        await student.save()
    
      sendtoken(student , 201 , res)
})


exports.studentupdate = catchAsyncError(async (req ,res, next) =>{
  
    await Student.findByIdAndUpdate(req.params.id , req.body).exec()
   res.status(200).json({
    success : true ,
    message : "Updated successfully"})

})

exports.studentavatar = catchAsyncError(async (req ,res, next) =>{
  
    const student = await Student.findById(req.params.id).exec()

    const file = req.files.avatar
    const modifiedName = `resumebuilder-${Date.now()}${path.extname(file.name)}`

    if(student.avatar.fileId !== ""){
      await  imagekit.deleteFile(student.avatar.fileId)
    }

    const {fileId  , url} = await imagekit.upload({
        file : file.data,
        fileName : modifiedName
    })
    student.avatar = {fileId , url}
   await student.save()
    res.json({
        success : true,
        message : "Avatar successfully uploaded"
    })

})
// ----------------------------read jobs-----------------
exports.readalljobs = catchAsyncError(async (req ,res , next)=>{
    const jobs = await Job.find().exec()
   res.status(200).json({jobs})
})

// ---------------------------read internships--------------

exports.readallinternships = catchAsyncError(async (req ,res , next)=>{
    const internships = await Internship.find().exec()
   res.status(200).json({internships})
})


// -----------------------------internship apply ---------------------------


exports.internshipapply = catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    const internship = await Internship.findById(req.params.internshipid).exec()

    student.internships.push(internship.id)
    internship.students.push(student.id)
    await student.save()
    await internship.save()
    res.status(201).json({student , internship})
})


//  -----------------------------jobs ---------------------------

exports.jobapply = catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    const job = await Job.findById(req.params.jobid).exec()

    student.jobs.push(job.id)
    job.students.push(student.id)
    await student.save()
    await job.save()
    res.status(201).json({student , job})
})