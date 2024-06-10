const router=require('express').Router()

const token=require('../controllers/token')

router.route('/')
.post(token.create)
.get(token.list)


router.route('/:id')
.put(token.update)
.get(token.read)
.delete(token.delete)





module.exports=router