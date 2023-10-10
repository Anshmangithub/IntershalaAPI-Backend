const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const internshipModel = new mongoose.Schema({
    students : [{type : mongoose.Schema.Types.ObjectId , ref : "students"}],
    employe :  {type : mongoose.Schema.Types.ObjectId , ref : "employe"},
   profile : String,
   skills : String,
   internshipType : {type : String , enum : ["In-office" , "remote"]},
   openings : Number,
   from : String,
   to  : String,
   duration  : String,
   responsibility : String,
   stipend : {
    status : {
        type : String ,
        enum : ["Fixed" , "Negotiable" , "Performance Based" , "unpaid"]

    },
    amount : Number
 },
  perks : String ,
   assesments : String
}, {timestamps : true})

internshipModel.pre("save" , function(){
   if(!this.isModified("password")){
    return;
   }

   let salt = bcrypt.genSaltSync(10);
   this.password = bcrypt.hashSync(this.password , salt) ;
})

internshipModel.methods.comparePassword = function(password){
  return bcrypt.compareSync(password , this.password)
}

internshipModel.methods.getjwttoken = function(){
    return jwt.sign({id : this._id} , process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_EXPIRE
    })
}

const Internship = mongoose.model("internships" , internshipModel);

module.exports = Internship;