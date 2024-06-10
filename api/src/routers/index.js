const router=require('express').Router()
const userRouter=require('./user')
const authRouter=require('./auth')
const brandRouter=require('./brands')
const firmRouter=require('./firms')
const categoryRouter=require('./categories')
const productRouter=require('./products')
const purchaseRouter=require('./purchases')
const saleRouter=require('./sales')
const tokenRouter=require('./tokens')
const resetRouter=require('./resetpassword')
const invicesRouter=require('./invoices')




router.use('/user',userRouter)
router.use('/auth',authRouter)
router.use('/brand',brandRouter)
router.use('/firm',firmRouter)
router.use('/sale',saleRouter)
router.use('/category',categoryRouter)
router.use('/product',productRouter)
router.use('/purchase',purchaseRouter)
router.use('/token',tokenRouter)
router.use('/reset',resetRouter)
router.use('/invoice',invicesRouter)


module.exports=router