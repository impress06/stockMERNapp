const {mongoose}=require('../config/dbConnection')

const purchaseSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true,
    },
    firmId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Firms",
        require:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Products",
        require:true
    },
    brandId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Brands",
        require:true
    },
    price:{
        type:Number,
        required:true,
        trim:true
        
    },
    quantity:{
        type:Number,
        default:1
    },
    priceTotal:{
        type:Number,
        default: function(){ return this.quantity * this.price }, // Create yaparken çalışacak
        transform: function(){ return this.quantity * this.price }, // Update yaparken çalışacak
        
    }
},{
    collection:"purchases",
    timestamps:true
})



module.exports=mongoose.model("Purchases",purchaseSchema)