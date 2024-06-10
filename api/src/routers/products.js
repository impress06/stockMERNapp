const router=require('express').Router()

const product=require('../controllers/products')

router.route('/')
.post(product.create)
.get(product.list)


router.route('/:id')
.put(product.update)
.get(product.read)
.delete(product.delete)





module.exports=router