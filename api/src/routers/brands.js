const router=require('express').Router()
const upload=require('../midilwares/upload')
const brand=require('../controllers/brands')

router.route('/')
.post(upload.single('image'),brand.create)
.get(brand.list)


router.route('/:id')
.put(upload.single('image'),brand.update)
.get(brand.read)
.delete(brand.delete)





module.exports=router