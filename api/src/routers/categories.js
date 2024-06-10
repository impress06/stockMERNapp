const router=require('express').Router()

const category=require('../controllers/categories')

router.route('/')
.post(category.create)
.get(category.list)


router.route('/:id')
.put(category.update)
.get(category.read)
.delete(category.delete)





module.exports=router