const firmModel=require('../models/firms')


module.exports={
    list:async(req,res)=>{
          /*
            #swagger.tags = ["Firms"]
            #swagger.summary = "List Firms"
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

        const data= await res.getModelList(firmModel)
        const detail= await res.getModelListDetails(firmModel)
        res.status(200).send({
            error:false,
            data,
            detail
        })

    },
    create:async(req,res)=>{
        /*
            #swagger.tags = ["Firms"]
            #swagger.summary = "Create Firm"
        */
        let data;
        
        

        if (req.file) {
            req.body.image = req.file.filename; 
             data = await firmModel.create(req.body)
        }
        else{
            
                 
            req.body.image = "664a6315b6029e9d099a5180-noimage2.webp"
            data= await firmModel.create(req.body)

        }

            

    
        
        res.status(201).send({
            error:false,
            data

        })
        
    },
    read:async(req,res)=>{
        /*
            #swagger.tags = ["Firms"]
            #swagger.summary = "Get Single Firm"
        */


        const data= await findOne({_id:req.params.id})

        res.status(200).send({
            error:false,
            data
        })
        

        
    },
    update:async(req,res)=>{
        /*
            #swagger.tags = ["Firms"]
            #swagger.summary = "Update Firm"
        */
            let data;
        
        
            if (req.file) {
                req.body.image = req.file.filename; 
                 data = await firmModel.updateOne({_id:req.params.id},req.body)
            }

            else{
                data= await firmModel.updateOne({_id:req.params.id},req.body)

            }
           
        
         

        res.status(200).send({
            error:false,
            data,
            modifed: await firmModel.findOne({_id:req.params.id})


        })

        
    },
    delete:async(req,res)=>{

         /*
            #swagger.tags = ["Firms"]
            #swagger.summary = "Delete Firm"
        */
        
        const data= await firmModel.deleteOne({_id:req.params.id})
    
        if(data.deletedCount>0){
          res.status(200).send({
            error:false,
            message:"brands deleted"
          })
        }
    
        
      }
}