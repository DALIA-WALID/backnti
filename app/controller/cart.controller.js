
const{ resGenerator} = require("../../middleware/helper")
require("../models/cart.model")
require("../models/products.model")

class cart {


    static addcart = async (req, res) => {
        try {
            const productId = req.body.productId;
            const userId = req.user._id;
            let cart = await Cart.findOne({ userId });

            if (!cart) {
                cart = new Cart({ userId, products: [] });
            }
        
            
            const existingProduct = cart.products.find(product => product.productId === productId);
        
            if (existingProduct) {
             
                existingProduct.quantity += quantity;
            } else {
        
                cart.products.push({ productId, quantity });
            }
        
           
            await cart.save();
            resGenerator(res, 200, true, userData, "cart is added")
          
        }
        catch (e) {
            resGenerator(res, 500, false, e, "error in insert")
        }

    }



    

    static removecart = async (req, res) => {

        
        const productId = req.body.productId;
        const userId = req.user._id;
        const finduser = await cartModel.findOne({ userId })
        if (!finduser) {
            resGenerator(res, 500, false, e, "you are not logged in")

        }
       

    }


    static removecart = async (req, res) => {
        
         
        try {
            const userId = req.user._id;
            const removeProducts = req.body.removeProducts;
          
                    
            const cart = await Cart.findOneAndRemove({ userId });

            if (!cart) {
                resGenerator(res, 500, false, e, "you are not logged in")
            }
            else {
                resGenerator(res, 200, true, carts, "data showed")
            }
        }
        catch (e) {
            resGenerator(res, 500, false, e, "error in insert")
        
  }
    }
    
    static showAllcarts = async(req,res) =>{
        try {
            const carts = await cartModel.find()
            resGenerator(res, 200, true, carts, "data showed")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in show data")
        }
    }
    

    static removeonefromCart = async(req,res)=>{
        try {
            const userId = req.user._id;
          const cart = await cartModel.find({userId})
            const findproduct = cart[0].products.findIndex(p => p.productid == req.params.pId)
            


         if( findproduct) {
            cart[0].products.splice(productindex,1)
             await cart[0].save()
             
            resGenerator(res, 200, true, cart[0], "product is  deleted")
         }
        }
         catch(e){
          resGenerator(res, 500, false, e.message, "error in delete product")
         }
    }
    
    static removeAllCartProducts = async(req,res)=>{
        try{
          const cart = await cartModel.find({userId:req.user._id})
          if(cart[0]){
            cart[0].products = []
            await cart[0].save()
            resGenerator(res, 200, true, cart[0], "products deleted")
          }
        }
        catch(e){
          resGenerator(res, 500, false, e.message, "error in delete product")
        }
        }






}