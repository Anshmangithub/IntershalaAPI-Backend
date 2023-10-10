const nodemailer = require("nodemailer");
const ErorrHandler = require("./ErorrHandler");

exports.sendmail = (req ,res , next , url) =>{
    const transport = nodemailer.createTransport({
        service : "gmail",
        host : "smtp.gmail.com",
        post : 465,
        auth : {
            user : process.env.EMAIL_ADDRESS,
            pass : process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from : "ANSH PRIVATE LIMITED",
        to : req.body.email,
        subject : "Password Reset Link",
        html : `<h2>Click the given below link to reset the password</h2>
               
                <h4>otp is ${url}</h4>`
    }

    transport.sendMail(mailOptions , (err , info) =>{
        if(err) return next(new ErorrHandler(err, 500))
        console.log(info);

       return res.status(200).json({
            message : "mail successfully sent" , 
          url })
    })
}

