exports.genratedErrors = ( err ,req ,res, next) => {
    const statusCode = err.statusCode || 500

    if(err.name === "MongoServerError" && err.message.includes("E11000 duplicate key")){
        err.message  = "Student with this email already exist"
    }

    res.status(statusCode).json({
        message : err.message,
        errName  : err.name,
        // Stack : err.Stack
    })
};