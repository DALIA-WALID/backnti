const taskController = require("../app/controller/products.controller")
const {authUser, authAdmin}=require("../app/middleware/auth.middleware")
const router = require("express").Router()

router.post("/add",authUser, productsController.addproduct)

router.get("/removeproduct ", authUser, productsController.removeproduct)
module.exports = router