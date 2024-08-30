require("dotenv").config({path : "./.env"})
const express = require("express");
const app = express();



// databse connectivity
require("./models/database").connectedDatabase();

//  logger 
const logger = require("morgan");
app.use(logger("tiny"))

// cors 
app.use(require("cors")({origin : true , credentials : true}))
// session and cookies

const session = require("express-session");
const cookieParser = require("cookie-parser");


app.use(session({
    resave : true,
    saveUninitialized : true,
    secret : process.env.EXPRESS_SESSION_SECRET 
    
    
}))

app.use(cookieParser())

// express-fileupload
const fileupload  = require("express-fileupload")
app.use(fileupload())

// bodyparser
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// routes
app.use("/" , require("./routes/indexRoutes"))
app.use("/resume" , require("./routes/resumeRoutes"))
app.use("/employe" , require("./routes/employeRoutes"))


app.use((req, res, next) => {
    if (req.url === '/favicon.ico') {
      res.status(204).end();
    } else {
      next();
    }
  });

// error handling

const ErorrHandler = require("./utils/ErorrHandler");
const { genratedErrors } = require("./middlewares/error");
app.all("*" , (req , res , next) =>{
    next(new ErorrHandler(`Requested URL is not found ${req.url}`) , 404)
})

app.use(genratedErrors)

app.listen(process.env.port , console.log(`server running on ${process.env.port}`))
