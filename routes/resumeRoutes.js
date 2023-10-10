const express = require("express");
const { resume , addeducation , editeducation , deleteeducation ,
        addjobs , editjobs , deletejobs ,
        addinterships , editinterships , deleteinterships ,
        addresponsibility , editresponsibility , deleteresponsibility ,
        addcourses , editcourses , deletecourses ,
        addprojects , editprojects , deleteprojects ,
        addskills , editskills , deleteskills ,
        addaccomplishments , editaccomplishments , deleteaccomplishments} = require("../controllers/resumeControllers");
const { isAuthenticated } = require("../middlewares/auth");

const router  = express.Router();

// routes

// GET /

router.get("/" ,isAuthenticated , resume)

// POST /add-edu

router.post("/add-edu" , isAuthenticated , addeducation)

// POST /edit-edu

router.post("/edit-edu/:eduid" , isAuthenticated , editeducation)

// POST /delete-edu

router.post("/delete-edu/:eduid" , isAuthenticated , deleteeducation)

// __________________________________________________jobs _______________________

router.post("/add-jobs" , isAuthenticated , addjobs)

// POST /edit-jobs

router.post("/edit-jobs/:eduid" , isAuthenticated , editjobs)

// POST /delete-jobs

router.post("/delete-jobs/:eduid" , isAuthenticated , deletejobs)

//  ______________________________________interships_________________________

router.post("/add-interships" , isAuthenticated , addinterships)

// POST /edit-interships

router.post("/edit-interships/:eduid" , isAuthenticated , editinterships)

// POST /delete-interships

router.post("/delete-interships/:eduid" , isAuthenticated , deleteinterships)

// ________________________________________responsibility__________________________


router.post("/add-responsibility" , isAuthenticated , addresponsibility)

// POST /edit-responsibility

router.post("/edit-responsibility/:eduid" , isAuthenticated , editresponsibility)

// POST /delete-responsibility

router.post("/delete-responsibility/:eduid" , isAuthenticated , deleteresponsibility)

// ______________________________________courses________________________

router.post("/add-courses" , isAuthenticated , addcourses)

// POST /edit-courses

router.post("/edit-courses/:eduid" , isAuthenticated , editcourses)

// POST /delete-courses

router.post("/delete-courses/:eduid" , isAuthenticated , deletecourses)


// _______________________________________projects________________________________

router.post("/add-projects" , isAuthenticated , addprojects)

// POST /edit-projects

router.post("/edit-projects/:eduid" , isAuthenticated , editprojects)

// POST /delete-projects

router.post("/delete-projects/:eduid" , isAuthenticated , deleteprojects)

// __________________________________skills_____________________________

router.post("/add-skills" , isAuthenticated , addskills)

// POST /edit-skills

router.post("/edit-skills/:eduid" , isAuthenticated , editskills)

// POST /delete-skills

router.post("/delete-skills/:eduid" , isAuthenticated , deleteskills)

// ___________________________________accomplishments_____________________________

router.post("/add-accomplishments" , isAuthenticated , addaccomplishments)

// POST /edit-accomplishments

router.post("/edit-accomplishments/:eduid" , isAuthenticated , editaccomplishments)

// POST /delete-accomplishments

router.post("/delete-accomplishments/:eduid" , isAuthenticated , deleteaccomplishments)



module.exports = router;