const purchasesModel=require('../models/purchases')


module.exports={
    list:async(req,res)=>{
          /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "List Purchases"
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

            const data= await res.getModelList(purchasesModel,{},"userId firmId productId brandId")
            const detail= await res.getModelListDetails(purchasesModel)
            res.status(200).send({
                error:false,
                data,
                detail
            })
        },
    create:async(req,res)=>{
        
          /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Create Purchas"
        */
        
         const  data= await purchasesModel.create(req.body)

      
        
        res.status(201).send({
            error:false,
            data

        })
        
    },
    read:async(req,res)=>{
         /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Get Single Purchas"
        */


        const data= await findOne({_id:req.params.id})

        res.status(200).send({
            error:false,
            data
        })
        

        
    },
    update:async(req,res)=>{
         /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Update Purchases"
        */
        
        const data= await purchasesModel.updateOne({_id:req.params.id},req.body)

        res.status(200).send({
            error:false,
            data,
            modifed: await purchasesModel.findOne({_id:req.params.id})


        })

        
    },
    delete:async(req,res)=>{
         /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Delete Purchas"
        */
        
        const data= await purchasesModel.deleteOne({_id:req.params.id})
    
        if(data.deletedCount>0){
          res.status(200).send({
            error:false,
            message:"purchas deleted"
          })
        }
    
        
      }
}