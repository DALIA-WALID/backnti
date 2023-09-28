const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors")
const userRouter = require("../routes/user.routes")
app.use(userRouter)
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


module.exports = app