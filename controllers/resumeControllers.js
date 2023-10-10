const { catchAsyncError } = require("../middlewares/catchAsyncError")
const Student = require("../models/studentSchema");
const ErorrHandler = require("../utils/ErorrHandler");
const { v4: uuidv4 } = require('uuid');

exports.resume =  catchAsyncError(async (req ,res , next)=>{
    const {resume} = await Student.findById(req.id).exec()
    res.json({
        message : "Resume routes",
        resume
    })
})

 
exports.addeducation =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    student.resume.education.push({...req.body ,id : uuidv4()})
    await student.save();
    res.json({
        message : "Education added!"
    })
})

exports.editeducation =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    const eduIndex = student.resume.education.findIndex((i)=> i.id === req.params.eduid)
    student.resume.education[eduIndex] = {...student.resume.education[eduIndex] , ...req.body}
    await student.save();
    res.json({
        message : "Education Uppdated!"
    })
})

exports.deleteeducation =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    const filteredu = student.resume.education.filter((i)=> i.id === req.params.eduid)
    student.resume.education = filteredu
    await student.save();
    res.json({
        message : "Education Delete!"
    })
})


// _______________________________________jobs ________________________________

exports.addjobs =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    student.resume.jobs.push({...req.body ,id : uuidv4()})
    await student.save();
    res.json({
        message : "Jobs added!"
    })
})

exports.editjobs =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    const eduIndex = student.resume.jobs.findIndex((i)=> i.id === req.params.eduid)
    student.resume.jobs[eduIndex] = {...student.resume.jobs[eduIndex] , ...req.body}
    await student.save();
    res.json({
        message : "Jobs Uppdated!"
    })
})

exports.deletejobs =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    const filteredu = student.resume.jobs.filter((i)=> i.id === req.params.eduid)
    student.resume.jobs = filteredu
    await student.save();
    res.json({
        message : "Jobs Delete!"
    })
})

// _________________________________________ interships _____________________________

exports.addinterships =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    student.resume.interships.push({...req.body ,id : uuidv4()})
    await student.save();
    res.json({
        message : "interships added!"
    })
})

exports.editinterships =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    const eduIndex = student.resume.interships.findIndex((i)=> i.id === req.params.eduid)
    student.resume.interships[eduIndex] = {...student.resume.interships[eduIndex] , ...req.body}
    await student.save();
    res.json({
        message : "interships Uppdated!"
    })
})

exports.deleteinterships =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    const filteredu = student.resume.interships.filter((i)=> i.id === req.params.eduid)
    student.resume.interships = filteredu
    await student.save();
    res.json({
        message : "interships Delete!"
    })
})


//  ______________________________________________________responsibility__________________

exports.addresponsibility =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    student.resume.responsibility.push({...req.body ,id : uuidv4()})
    await student.save();
    res.json({
        message : "responsibility added!"
    })
})

exports.editresponsibility =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    const eduIndex = student.resume.responsibility.findIndex((i)=> i.id === req.params.eduid)
    student.resume.responsibility[eduIndex] = {...student.resume.responsibility[eduIndex] , ...req.body}
    await student.save();
    res.json({
        message : "responsibility Uppdated!"
    })
})

exports.deleteresponsibility =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    const filteredu = student.resume.responsibility.filter((i)=> i.id === req.params.eduid)
    student.resume.responsibility = filteredu
    await student.save();
    res.json({
        message : "responsibility Delete!"
    })
})

// _______________________________________________courses___________________________

exports.addcourses =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    student.resume.courses.push({...req.body ,id : uuidv4()})
    await student.save();
    res.json({
        message : "courses added!"
    })
})

exports.editcourses =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    const eduIndex = student.resume.courses.findIndex((i)=> i.id === req.params.eduid)
    student.resume.courses[eduIndex] = {...student.resume.courses[eduIndex] , ...req.body}
    await student.save();
    res.json({
        message : "courses Uppdated!"
    })
})

exports.deletecourses =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    const filteredu = student.resume.courses.filter((i)=> i.id === req.params.eduid)
    student.resume.courses = filteredu
    await student.save();
    res.json({
        message : "courses Delete!"
    })
})


// ______________________________________________projects_________________

exports.addprojects =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    student.resume.projects.push({...req.body ,id : uuidv4()})
    await student.save();
    res.json({
        message : "projects added!"
    })
})

exports.editprojects =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    const eduIndex = student.resume.projects.findIndex((i)=> i.id === req.params.eduid)
    student.resume.projects[eduIndex] = {...student.resume.projects[eduIndex] , ...req.body}
    await student.save();
    res.json({
        message : "projects Uppdated!"
    })
})

exports.deleteprojects =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    const filteredu = student.resume.projects.filter((i)=> i.id === req.params.eduid)
    student.resume.projects = filteredu
    await student.save();
    res.json({
        message : "projects Delete!"
    })
})


// _________________________________________skills _______________________________


exports.addskills =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    student.resume.skills.push({...req.body ,id : uuidv4()})
    await student.save();
    res.json({
        message : "skills added!"
    })
})

exports.editskills =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    const eduIndex = student.resume.skills.findIndex((i)=> i.id === req.params.eduid)
    student.resume.skills[eduIndex] = {...student.resume.skills[eduIndex] , ...req.body}
    await student.save();
    res.json({
        message : "skills Uppdated!"
    })
})

exports.deleteskills =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    const filteredu = student.resume.skills.filter((i)=> i.id === req.params.eduid)
    student.resume.skills = filteredu
    await student.save();
    res.json({
        message : "skills Delete!"
    })
})


// ____________________________________________accomplishments______________________________


exports.addaccomplishments =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    student.resume.accomplishments.push({...req.body ,id : uuidv4()})
    await student.save();
    res.json({
        message : "accomplishments added!"
    })
})

exports.editaccomplishments =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    const eduIndex = student.resume.accomplishments.findIndex((i)=> i.id === req.params.eduid)
    student.resume.accomplishments[eduIndex] = {...student.resume.accomplishments[eduIndex] , ...req.body}
    await student.save();
    res.json({
        message : "accomplishments Uppdated!"
    })
})

exports.deleteaccomplishments =  catchAsyncError(async (req ,res , next)=>{
    const student = await Student.findById(req.id).exec()
    const filteredu = student.resume.accomplishments.filter((i)=> i.id === req.params.eduid)
    student.resume.accomplishments = filteredu
    await student.save();
    res.json({
        message : "accomplishments Delete!"
    })
})
