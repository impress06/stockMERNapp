const saleModel=require('../models/sales')


module.exports={
    list:async(req,res)=>{
          /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "List Sales"
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

        const data= await res.getModelList(saleModel,{},"userId  productId brandId")
        const detail= await res.getModelListDetails(saleModel)
        res.status(200).send({
            error:false,
            data,
            detail
        })
    },
    create:async(req,res)=>{
        
          /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Create Sales"
        */
        
         const  data= await saleModel.create(req.body)

      
        
        res.status(201).send({
            error:false,
            data

        })
        
    },
    read:async(req,res)=>{
         /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Get Single Sales"
        */


        const data= await findOne({_id:req.params.id})

        res.status(200).send({
            error:false,
            data
        })
        

        
    },
    update:async(req,res)=>{
         /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Update Sales"
        */
        
        const data= await saleModel.updateOne({_id:req.params.id},req.body)

        res.status(200).send({
            error:false,
            data,
            modifed: await saleModel.findOne({_id:req.params.id})


        })

        
    },
    delete:async(req,res)=>{
         /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Delete Sales"
        */
        
        const data= await saleModel.deleteOne({_id:req.params.id})
    
        if(data.deletedCount>0){
          res.status(200).send({
            error:false,
            message:"sale deleted"
          })
        }
    
        
      }
}