const userController = require("../app/controller/user.controller")
const {authUser, authAdmin} = require("../app/middleware/auth.middleware")

const router = require("express").Router()

router.post("/add", userController.addUser)
router.post("/addAdmin", authUser, authAdmin, userController.addAdmin)
router.get("/all", authUser, userController.displayallusers)

router.delete("/all/:id", userController.deleteoneuser)
router.patch("/all/:id", userController.editSingle)
router.post("/login", userController.login)
router.get("/myProfile", authUser, userController.showmyProfile)
router.post("/changeStatus/:id", authUser, userController.changeStatus)

module.exports = router
