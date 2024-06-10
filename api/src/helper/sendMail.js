const nodemailer=require('nodemailer')

module.exports=function(to,subject,message){

    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"fullstackteams@gmail.com",
            pass:"tojr glvm nevq rdji"
        }

    })


    transporter.sendMail({
        to:to,
        subject:subject,
        html:message
    },(error,info)=>{
        if (error) {
            console.error("Email send error:", error);
          } else {
            console.log("Email sent successfully:", info);
          }
    })


}