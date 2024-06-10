const productModel=require('../models/products')
const categoryModel=require('../models/categories')


module.exports={
    list:async(req,res)=>{
          /*
            #swagger.tags = ["Products"]
            #swagger.summary = "List Products"
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
       
            const categoryName = req.query.categoryname;

            let data, detail;
        
            if (categoryName === "All" || !categoryName) {
                data = await res.getModelList(productModel, null, 'categoryId brandId');
                detail = await res.getModelListDetails(productModel);
            } else {
                const categoryFind = await categoryModel.find({
                    name: { $regex: categoryName, $options: 'i' }
                });
        
                if (categoryFind.length > 0) {
                    const filter = {
                        categoryId: (categoryFind[0]._id).toString()
                    };
        
                    data = await res.getModelList(productModel, filter, 'categoryId');
                    detail = await res.getModelListDetails(productModel, filter);
                } else {
                    data = [];
                    detail = {
                        filter: {},
                        search: {},
                        sort: {},
                        skip: 0,
                        limit: 0,
                        page: 0,
                        pages: {},
                        totalRecords: 0,
                    };
                }
            }
        
            res.status(200).send({
                error: false,
                data,
                detail
            });
        },
    create:async(req,res)=>{
        
          /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Create Product"
        */
        
         const  data= await productModel.create(req.body)

      
        
        res.status(201).send({
            error:false,
            data

        })
        
    },
    read:async(req,res)=>{
         /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Get Single Product"
        */


        const data= await findOne({_id:req.params.id})

        res.status(200).send({
            error:false,
            data
        })
        

        
    },
    update:async(req,res)=>{
         /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Update Product"
        */
        
        const data= await productModel.updateOne({_id:req.params.id},req.body)

        res.status(200).send({
            error:false,
            data,
            modifed: await productModel.findOne({_id:req.params.id})


        })

        
    },
    delete:async(req,res)=>{
         /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Delete Product"
        */
        
        const data= await productModel.deleteOne({_id:req.params.id})
    
        if(data.deletedCount>0){
          res.status(200).send({
            error:false,
            message:"product deleted"
          })
        }
    
        
      }
}