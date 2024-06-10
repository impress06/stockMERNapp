const userModel = require("../models/user");
const tokenModel=require('../models/token')
const passwordCrypto = require("../helper/passwordCrypto");
const jwt=require('jsonwebtoken')


module.exports = {
  login: async (req, res) => {

       /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get Token and JWT.'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                }
            }
        */
    const { userName, password, email } = req.body;
    

    if ((userName || email) && password) {
      const user = await userModel.findOne({ $or: [{ userName }, { email }] });
      

      if (user && user.password == passwordCrypto(password)) {
        if (user.isActive) {
          req.session.userName=user.userName
          req.session.password=user.password
          req.session.email=user.email

          if(req.body?.rememberMe){
            req.session.rememberMe=req.body?.rememberMe
            req.sessionOptions.maxAge=1000*60*24*3
           
            
          }


           let tokenData= await tokenModel.findOne({userId:user._id})

            if(!tokenData)
            {
                 tokenData= await tokenModel.create({userId:user._id,token:passwordCrypto(user._id + Date.now())})
            }

            const jwtToken=jwt.sign(user.toJSON(),process.env.AccessKey,{expiresIn:"45m"})
            const refresToken=jwt.sign({_id:user._id,password:user.password},process.env.jwtrefreshKey,{expiresIn:"3m"})

            res.status(200).send({
                error:false,
                message:"login successfully",
                token:tokenData.token,
                bearer:{jwtToken,refresToken},
                user
            })




        } else {
          res.errorCode = 403;
          throw new Error(" your account banned");
        }
      } else {
        res.errorCode = 403;
        throw new Error(" your e mail username or password invalid");
      }
    } else {
      res.errorCode = 403;
      throw new Error("you must type username ,password and email");
    }
  },
  

  logout:async(req,res)=>{
      /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Token: Logout"
            #swagger.description = 'Delete token-key.'
        */


    req.session=null

    const tokenData=req.headers?.authorization

    const data= await tokenModel.deleteOne({token: tokenData.split(' ')[1]})
    
    if(data.deletedCount>0){
      res.status(200).send({
        error:false,
        message:"token deleted sucess"
      })
    }

    
  }
};
