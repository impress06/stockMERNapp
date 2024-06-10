
module.exports={
    
    isLogin:(req,res,next)=>{
        if(req.user.isActive){
            next()
        }
        else{
            res.errorCode=403
            throw new Error("you must login or you banned")
        }
    },
    isAdmin:(req,res,next)=>{
        if(req.user.isAdmin){
            next()
        }
        else{
            res.errorCode=403
            throw new Error("you must be Admin")
        }
    },
    isAdminOrStaff:(req,res,next)=>{
        if(req.user.isActive &&(req.user.isAdmin || req.user.isStaff))
        {
            next()

        }
        else{
            res.errorCode=403
            throw new Error("you must be Admin or Staff")

        }
    }

}