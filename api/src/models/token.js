const {mongoose}=require('../config/dbConnection')

const tokenSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Users",
        index:true
    },
    token:{
        type:String,
        required:true,
        index:true

    }
},
{
    collection:"tokens",
    timestamps:true
})

module.exports=mongoose.model("Tokens",tokenSchema)