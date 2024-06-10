const router=require('express').Router()

const invoices=require('../midilwares/invoices')

router.route('/')
.post(invoices)



module.exports=router