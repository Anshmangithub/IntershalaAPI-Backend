const express = require("express");
const { homepage , studentsignup , 
    studentsignin , 
    studentsignout ,
     currentuser , 
     studentsendmail , 
     studentforgetlink ,

    studentresetpassword,
    studentupdate,
 studentavatar,
    internshipapply,
     jobapply,
      readalljobs, 
   readallinternships} = require("../controllers/indexControllers");
const { isAuthenticated } = require("../middlewares/auth");

const router  = express.Router();

// routes

// GET /

router.get("/" , homepage)
// GET /student

router.post("/student" ,isAuthenticated , currentuser)

// POST /student/signup
router.post("/student/signup" ,  studentsignup )

// POST /student/singin
router.post("/student/signin" , studentsignin )

// GET /student/singout
router.get("/student/signout" ,isAuthenticated ,  studentsignout )


// POST /student/send-mail
router.post("/student/send-mail/" ,  studentsendmail )


// GET /student/forget-link/:studentId
router.post("/student/forget-link/" ,  studentforgetlink )

// POST /student/reset-password/:studentId
router.post("/student/reset-password/:id" ,  studentresetpassword )

// POST /student/update/:studentId
router.post("/student/update/:id" , isAuthenticated , studentupdate )


// POST /student/update/:studentId
router.post("/student/avatar/:id" , isAuthenticated , studentavatar )

// --------------------------------read jobs ------------

// POST /student/alljobs
router.post("/student/alljobs" , isAuthenticated , readalljobs )

// --------------------------------read internships---------------

// POST /student/allinternships
router.post("/student/allinternships" , isAuthenticated , readallinternships )


// -----------------------------apply internship--------------------

// POST /student/apply/internship/:internshipid
router.post("/student/apply/internship/:internshipid" , isAuthenticated , internshipapply )


// -----------------------------apply job--------------------

// POST /student/apply/job/:jobid
router.post("/student/apply/job/:jobid" , isAuthenticated , jobapply )



module.exports = router;