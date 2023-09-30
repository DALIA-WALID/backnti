const cartcontroller = require("../coffeeApp/controller/carts.controller")
const {authUser, authAdmin} = require("../coffeeApp/middleware/auth.middleware")
const upload = require("../coffeeApp/middleware/upload.middleware")
const router = require("express").Router()


router.post("/addcart", authUser, cartcontroller.addcart )
router.get("/allCarts" ,authUser , authAdmin , cartcontroller.showAllcarts )


router.delete("/removeonefromCart/:pId", authUser, cartcontroller.removeonefromCart)
router.delete("/removeCart", authUser, cartcontroller.removeCart)

router.delete("/removeAllCartProducts" , authUser  , cartcontroller.removeAllCartProducts)

module.exports = router