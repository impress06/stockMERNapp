const router=require('express').Router()

const purchase=require('../controllers/purchases')

router.route('/')
.post(purchase.create)
.get(purchase.list)


router.route('/:id')
.put(purchase.update)
.get(purchase.read)
.delete(purchase.delete)





module.exports=router