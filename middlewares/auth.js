const jwt = require("jsonwebtoken");
const ErorrHandler  = require("../utils/ErorrHandler");
const { catchAsyncError } = require("./catchAsyncError");

exports.isAuthenticated  = catchAsyncError( async(req, res ,next) =>{
    const {token} = req.cookies
   
     if(!token){
        return next( new ErorrHandler("please login first to access the app resources" , 401))
     }

     const {id}  = jwt.verify(token , process.env.JWT_SECRET)
    req.id = id
    next()
})