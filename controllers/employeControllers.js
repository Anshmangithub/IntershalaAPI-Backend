const { catchAsyncError } = require("../middlewares/catchAsyncError")
const Employe = require("../models/employeSchema");
const Internship = require("../models/internshipSchema");
const Job = require("../models/jobSchema");
const ErorrHandler = require("../utils/ErorrHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendtoken } = require("../utils/SendToken");
const imagekit = require("../utils/ImageKit").initImageKit();
const path  = require("path")

exports.homepage =  catchAsyncError(async (req ,res , next)=>{
    res.json({
        message : "Employe routes "
    })
})

exports.currentemploye = catchAsyncError(async (req ,res , next)=>{
    const employe = await Employe.findById(req.id).populate("jobs").populate("internships").exec()
    res.json({employe})
})

exports.employesignup =  catchAsyncError(async (req ,res , next)=>{

    const employe  = await new Employe(req.body).save();
    
    sendtoken(employe , 201 , res)
})

exports.employesignin =  catchAsyncError(async (req ,res , next)=>{

   const employe = await Employe.findOne({email : req.body.email}).select("+password").exec()
   
   if(!employe) return next(new ErorrHandler("user is not found with this email address" , 404))

   const isMatch = employe.comparePassword(req.body.password);

   if(!isMatch) return next(new ErorrHandler("wrong credential" , 500))


   sendtoken(employe , 201 , res)
})


exports.employesignout =  catchAsyncError(async (req ,res , next)=>{

  res.clearCookie("token");
  res.json({message : "succesfully signout "})
})

exports.employesendmail = catchAsyncError(async (req ,res, next) =>{
    const employe = await Employe.findOne({email : req.body.email}).exec()

    if(!employe){
        return next(new ErorrHandler("user with this email address is not exists" , 404))
    }

    const url = Math.floor(Math.random() * 9000 + 1000)
        
    
    sendmail(req , res , next , url)
  
        employe.resetPasswordToken = `${url}`
        await employe.save();
   
    res.json({message : "mail send successfully"})
})


exports.employeforgetlink = catchAsyncError(async (req ,res, next) =>{
    const employe = await Employe.findOne({email : req.body.email}).exec()

    if(!employe){
        return next(new ErorrHandler("user with this email address is not exists" , 404))
    }
    
    if(employe.resetPasswordToken == req.body.otp){
        employe.resetPasswordToken = "0"
        employe.password = req.body.password 
        await employe.save()
    }else{
        return next(new ErorrHandler("Invalid password reset link , please try again" , 404))
    }
    res.status(200).json({

        message : "password changed successfully"
    })
})



exports.employeresetpassword = catchAsyncError(async (req ,res, next) =>{
    const employe = await Employe.findById(req.params.id).exec()

        employe.password = req.body.password 
        await employe.save()
    
      sendtoken(employe , 201 , res)
})


exports.employeupdate = catchAsyncError(async (req ,res, next) =>{
  
    await Employe.findByIdAndUpdate(req.params.id , req.body).exec()
   res.status(200).json({
    success : true ,
    message : "Updated successfully"})

})

exports.employeavatar = catchAsyncError(async (req ,res, next) =>{
  
    const employe = await Employe.findById(req.params.id).exec()

    const file = req.files.organizationLogo
    const modifiedName = `resumebuilder-${Date.now()}${path.extname(file.name)}`

    if(employe.organizationLogo.fileId !== ""){
      await  imagekit.deleteFile(employe.organizationLogo.fileId)
    }

    const {fileId  , url} = await imagekit.upload({
        file : file.data,
        fileName : modifiedName
    })
    employe.organizationLogo = {fileId , url}
   await employe.save()
    res.json({
        success : true,
        message : "OrganizationLogo successfully uploaded"
    })

})

// -------------------------------------internship------------------------------

exports.internshipcreate =  catchAsyncError(async (req ,res , next)=>{
    const employe = await Employe.findById(req.id).exec()
    const internship  = await new Internship(req.body)
    internship.employe = employe._id;
    employe.internships.push(internship._id)
     await internship.save();
     await employe.save()
      res.status(201).json({success : true , internship })
})

exports.internshipread =  catchAsyncError(async (req ,res , next)=>{
    const {internships} = await Employe.findById(req.id).populate("internships").exec()
    res.status(201).json({success : true , internships})
})

exports.internshipsingleread =  catchAsyncError(async (req ,res , next)=>{
    const internship = await Internship.findById(req.params.id).exec()
    res.status(201).json({success : true , internship})
})


// ---------------------------------------jobs -------------------------------------


exports.jobcreate =  catchAsyncError(async (req ,res , next)=>{
    const employe = await Employe.findById(req.id).exec()
    const job  = await new Job(req.body)
    job.employe = employe._id;
    employe.jobs.push(job._id)
     await job.save();
     await employe.save()
      res.status(201).json({success : true , job })
})

exports.jobread =  catchAsyncError(async (req ,res , next)=>{
    const {jobs} = await Employe.findById(req.id).populate("jobs").exec()
    res.status(201).json({success : true , jobs})
})

exports.jobsingleread =  catchAsyncError(async (req ,res , next)=>{
    const job = await Job.findById(req.params.id).exec()
    res.status(201).json({success : true , job})
})
