const brandModel=require('../models/brands')


module.exports={
    list:async(req,res)=>{
          /*
            #swagger.tags = ["Brands"]
            #swagger.summary = "List Brands"
            #swagger.description = `
                You can send query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data= await res.getModelList(brandModel)
        const detail= await res.getModelListDetails(brandModel)
        res.status(200).send({
            error:false,
            data,
            detail
        })

    },
    create:async(req,res)=>{

          /*
            #swagger.tags = ["Brands"]
            #swagger.summary = "Create Brand"
        */
        let data;
        
        

        if (req.file) {
            req.body.image = req.file.filename; 
             data = await brandModel.create(req.body)
        }
        else{

            data= await brandModel.create(req.body)
        }

            

    
        
        res.status(201).send({
            error:false,
            data

        })
        
    },
    read:async(req,res)=>{

         /*
            #swagger.tags = ["Brands"]
            #swagger.summary = "Get Single Brand"
        */


        const data= await findOne({_id:req.params.id})

        res.status(200).send({
            error:false,
            data
        })
        

        
    },
    update:async(req,res)=>{

         /*
            #swagger.tags = ["Brands"]
            #swagger.summary = "Update Brand"
        */
        
        
            if (req.file) {
                req.body.image = req.file.filename; 
                 data = await brandModel.updateOne({_id:req.params.id},req.body)
            }

            else{
                data= await brandModel.updateOne({_id:req.params.id},req.body)

            }

        res.status(200).send({
            error:false,
            data,
            modifed: await brandModel.findOne({_id:req.params.id})


        })

        
    },
    delete:async(req,res)=>{

           /*
            #swagger.tags = ["Brand"]
            #swagger.summary = "Delete Brand"
        */

        
        const data= await brandModel.deleteOne({_id:req.params.id})
    
        if(data.deletedCount>0){
          res.status(200).send({
            error:false,
            message:"brands deleted"
          })
        }
    
        
      }
}