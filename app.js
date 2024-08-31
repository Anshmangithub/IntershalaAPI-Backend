require("dotenv").config({path : "./.env"})
const express = require("express");
const MongoStore = require('connect-mongo');
const app = express();




// databse connectivity
require("./models/database").connectedDatabase();

//  logger 
const logger = require("morgan");
app.use(logger("tiny"))

// cors 
app.use(require("cors")({origin : true ,  credentials : true}))
// session and cookies

const session = require("express-session");
const cookieParser = require("cookie-parser");


app.use(session({
    resave : false,
    saveUninitialized : true,
    secret : process.env.EXPRESS_SESSION_SECRET, 
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
    collectionName: 'sessions', // Collection name where sessions will be stored
    cookie: { maxAge: 180 * 60 * 1000 }, // Session expiration time in seconds (14 days)
    autoRemove: 'native' // Automatically remove expired sessions
    
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



// error handling

const ErorrHandler = require("./utils/ErorrHandler");
const { genratedErrors } = require("./middlewares/error");
app.all("*" , (req , res , next) =>{
    next(new ErorrHandler(`Requested URL is not found ${req.url}`) , 404)
})

app.use(genratedErrors)

app.listen(process.env.port , console.log(`server running on ${process.env.port}`))
