
const {mongoose}=require('../config/dbConnection.js')

const categorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    }
},{
    collection:"categories",
    timestamps:true
})

module.exports=mongoose.model('Categories',categorySchema)