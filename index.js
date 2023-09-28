require("dotenv").config()

require("./database/connection")

const app = require("./app/src")

app.listen(process.env.PORT, ()=> console.log(process.env.appURL))
