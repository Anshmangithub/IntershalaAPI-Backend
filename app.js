require("dotenv").config({path : "./.env"})
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")
const app = express();

const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.setMaxListeners(20);
// databse connectivity
require("./models/database").connectedDatabase();

//  logger 
const logger = require("morgan");
app.use(logger("tiny"))

// cors 
app.use(require("cors")({origin : ["https://talent-forge-chi.vercel.app"], 
                         methods: ["POST" , "GET"] , credentials : true}))
// session and cookies

const cookieParser = require("cookie-parser");

app.use(session({
    resave : false,
    saveUninitialized : true,
    secret : process.env.EXPRESS_SESSION_SECRET ,
    store : MongoStore.create({
        mongoUrl : process.env.MONGODB_URL
    })
    
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
