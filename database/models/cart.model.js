const mongoose = require("mongoose")
const validator = require("validator")
const cartSchema = mongoose.Schema({ 

  
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user", 
        required:true
    },

    productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"product", 
        required:true
    },
    carttype: {
        type: Array,
        
    },
    
   
    content:{
        type:String,
        trim:true
    },




})
module.exports=cartSchema