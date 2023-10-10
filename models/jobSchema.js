const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const jobModel = new mongoose.Schema({
  students : [{type : mongoose.Schema.Types.ObjectId , ref : "students"}],
  employe :  {type : mongoose.Schema.Types.ObjectId , ref : "employe"},
   title : String,
   skills : String,
   jobType : {type : String , enum : ["In-office" , "remote"]},
   openings : Number,
   description   : String,
   preferences  : String,
   salary : Number,
    perks : String,
   assesments : String
}, {timestamps : true})

jobModel.pre("save" , function(){
   if(!this.isModified("password")){
    return;
   }

   let salt = bcrypt.genSaltSync(10);
   this.password = bcrypt.hashSync(this.password , salt) ;
})

jobModel.methods.comparePassword = function(password){
  return bcrypt.compareSync(password , this.password)
}

jobModel.methods.getjwttoken = function(){
    return jwt.sign({id : this._id} , process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_EXPIRE
    })
}

const Job = mongoose.model("jobs" , jobModel);

module.exports = Job;