const mongoose = require("mongoose")
const validator = require("validator")
const productschema = mongoose.Schema({
    title:{
        type:String, 
        trim:true, 
        required:true
    },
    price:{
        type: Number,
        required: true,
    },
    pricewithSALE:{
        type: Number,
       
    },
    productrate: {
        type: Number,
        default: 0,
        enum: [0, 1, 2, 3, 4, 5],
    },
    category:{
        type:String,
        enum:['female' , "male" , "children" ]
        
      },
    content:{
        type:String,
        trim:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user", 
        required:true
    }, 
    productSchema.virtual("allproducts", {
        ref:"cart",
        localField: "_id",
        foreignField:"products.productid"
    })

})
const productModel = mongoose.model("task",productschema)
module.exports = productModel