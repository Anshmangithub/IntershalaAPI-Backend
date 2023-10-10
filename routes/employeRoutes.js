const express = require("express")
const {
    homepage, 
    currentemploye , 
    employesignup , 
    employesignin , 
    employesignout ,
    employesendmail , 
    employeforgetlink ,
    employeresetpassword,
    employeupdate,
    employeavatar,
    internshipcreate,
   internshipread,
   internshipsingleread,
   jobcreate,
   jobread,
   jobsingleread
   
} = require("../controllers/employeControllers");
const { isAuthenticated } = require("../middlewares/auth");

const router  = express.Router();

// routes

// GET /

router.get("/" , homepage)
// GET /employe

router.post("/current" ,isAuthenticated , currentemploye)

// POST /employe/signup
router.post("/signup" ,  employesignup )

// // POST /employe/singin
router.post("/signin" , employesignin )

// // GET /employe/singout
router.get("/signout" ,isAuthenticated ,  employesignout )


// // POST /employe/send-mail
router.post("/send-mail" ,  employesendmail )


// // GET /employe/forget-link/:employeId
router.post("/forget-link/" ,  employeforgetlink )

// // POST /employe/reset-password/:employeId
router.post("/reset-password/:id" ,  employeresetpassword )

// // POST /employe/update/:employeId
router.post("/update/:id" , isAuthenticated , employeupdate )


// // POST /employe/update/:employeId
router.post("/avatar/:id" , isAuthenticated , employeavatar )

//  -------------------------------------internship ------------------------------

// POST /employe/internship/create 

router.post("/internship/create" , isAuthenticated , internshipcreate )

// POST /employe/internship/read 

router.post("/internship/read" , isAuthenticated , internshipread )

// POST /employe/internship/read:id 

router.post("/internship/read/:id" , isAuthenticated , internshipsingleread )

// ------------------------------------jobs ----------------------------------

// POST /employe/internship/create 

router.post("/job/create" , isAuthenticated , jobcreate )

// POST /employe/job/read 

router.post("/job/read" , isAuthenticated , jobread )

// POST /employe/job/read:id 

router.post("/job/read/:id" , isAuthenticated , jobsingleread )


module.exports = router;