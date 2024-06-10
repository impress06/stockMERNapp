const {mongoose}=require('../config/dbConnection')

const productSchema= new mongoose.Schema({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Categories",
        required:true,
    },
    brandId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Brands",
        required:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    quantity:{
        type:Number,
        default:1
    }
},{
    collection:"products",
    timestamps:true
})

module.exports=mongoose.model("Products",productSchema)