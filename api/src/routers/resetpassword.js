const router=require('express').Router()
const resetPassword=require('../controllers/sendAndVerfyCode')

router.route('/')
.post(resetPassword.sendResetCode)
.put(resetPassword.resetPassword)








module.exports=router