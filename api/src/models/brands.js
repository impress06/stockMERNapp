const {mongoose}=require('../config/dbConnection')

const brandSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    image:String
},{
    collection:"brands",
    timestamps:true
})

module.exports=mongoose.model("Brands",brandSchema)