const router=require('express').Router()

const sale=require('../controllers/sales')

router.route('/')
.post(sale.create)
.get(sale.list)


router.route('/:id')
.put(sale.update)
.get(sale.read)
.delete(sale.delete)





module.exports=router