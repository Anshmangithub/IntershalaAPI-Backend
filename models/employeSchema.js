const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const employeModel = new mongoose.Schema({
    firstName : {
        type : String,
        required : [true , "Frist Name is required"],
        minLength : [4 , "atleast 4 charachter should have "]
    },
    lastName :{
        type : String,
        required : [true , "Last Name is required"],
        minLength : [4 , "atleast 4 charachter should have "]
    },
    contact :{
        type : String,
        required : [true , "Contact is required"],
        minLength : [10 , "Number should have 10 charachter"],
        maxLength : [10 , "Number should have 10 charachters"]
    },
    organizationName : {
        type : String,
        required : [true , "Organization Name is required"],
        minLength : [4 , "Character should have atleast minmum 4 charachter"],
    },
   
    organizationLogo : {
        type : Object,
        default : {
            fileId : '',
            url : "https://images.unsplash.com/photo-1695504237592-df3322573ee4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
        }
    },
    email : {
        type : String,
        unique : true,
        required : [true , "Email is required"],
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type : String,
        required : [true , "Password is required"],
        select : false,
        maxLength : [15 , "password should have only 15 charachters"],
        minLength  : [6 , "atleast minimum 5 charachter should have"]
    },
    resetPasswordToken : {
        type : String,
        default : "0"
    },
    internships : [
        {type : mongoose.Schema.Types.ObjectId , ref : "internships"}
    ],
    jobs : [
         {type : mongoose.Schema.Types.ObjectId , ref : "jobs"}
    ]

}, {timestamps : true})

employeModel.pre("save" , function(){
   if(!this.isModified("password")){
    return;
   }

   let salt = bcrypt.genSaltSync(10);
   this.password = bcrypt.hashSync(this.password , salt) ;
})

employeModel.methods.comparePassword = function(password){
  return bcrypt.compareSync(password , this.password)
}

employeModel.methods.getjwttoken = function(){
    return jwt.sign({id : this._id} , process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_EXPIRE
    })
}

const Employe = mongoose.model("employes" , employeModel);

module.exports = Employe;