const router=require('express').Router()
const upload=require('../midilwares/upload')
const firm=require('../controllers/firms')



router.route('/')
.post(upload.single('image'),firm.create)
.get(firm.list)


router.route('/:id')
.put(upload.single('image'),firm.update)
.get(firm.read)
.delete(firm.delete)





module.exports=router