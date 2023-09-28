const {resGenerator} = require("../helper")
const productsModel = require("../../database/models/products.model")
class products{

    static addproduct = async (req, res) => {
         try{const productdata = new productsModel({ userid: req.user.id, ...req.body })
        await productdata.save()
        resGenerator(res, 200, true, productdata, "product is added successfully")}
        
         catch (e) {
            resGenerator(res, 500, false, e, "error in adding ")
     }
}
    static removeproduct = async (req, res) => {
        try {
            const productdata = await productsModel.findByIdAndDelete(req.params.id)
            resGenerator(res, 200, true, null, "product  is deleted succesfully")
     }
        catch (e) {
            resGenerator(res, 500, false, e, "error in removing ")
}
 }


}