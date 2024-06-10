const tokenModel=require('../models/token')


module.exports={
    list:async(req,res)=>{
          /*
            #swagger.tags = ["Tokens"]
            #swagger.summary = "List Tokens"
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

        const data= await res.getModelList(tokenModel)
        res.status(200).send({
            error:false,
            data
        })

    },
    create:async(req,res)=>{
        
          /*
            #swagger.tags = ["Tokens"]
            #swagger.summary = "Create Tokens"
        */
        
         const  data= await tokenModel.create(req.body)

      
        
        res.status(201).send({
            error:false,
            data

        })
        
    },
    read:async(req,res)=>{
         /*
            #swagger.tags = ["Tokens"]
            #swagger.summary = "Get Single Tokens"
        */


        const data= await findOne({_id:req.params.id})

        res.status(200).send({
            error:false,
            data
        })
        

        
    },
    update:async(req,res)=>{
         /*
            #swagger.tags = ["Tokens"]
            #swagger.summary = "Update Tokens"
        */
        
        const data= await tokenModel.updateOne({_id:req.params.id},req.body)

        res.status(200).send({
            error:false,
            data,
            modifed: await tokenModel.findOne({_id:req.params.id})


        })

        
    },
    delete:async(req,res)=>{
         /*
            #swagger.tags = ["Tokens"]
            #swagger.summary = "Delete Tokens"
        */
        
        const data= await tokenModel.deleteOne({_id:req.params.id})
    
        if(data.deletedCount>0){
          res.status(200).send({
            error:false,
            message:"token deleted"
          })
        }
    
        
      }
}