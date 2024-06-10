const router=require('express').Router()
const user=require('../controllers/user')
const passwordValidate=require('../midilwares/passwordValidate')
const permission=require('../midilwares/permissions')



router.route('/')
.post(passwordValidate,user.create)
.get(permission.isLogin,user.list) 

// router.route('/')
// .post(passwordValidate,user.create)
// .get(upload.array( tırnak içinde frontend te inputa koydugun name ismini buraya yazacaksın ve postman gibi uygulamada gönderiken field name aynısını yazacaksın),user.list)
router.route('/:id')
.put(permission.isLogin,user.update)
.get(permission.isLogin,user.read)
.delete(permission.isAdmin,user.delete)

module.exports=router