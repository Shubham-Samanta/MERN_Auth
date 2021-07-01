const express = require("express")
const app = express()

//import Routes
const AuthRoute = require("./Routes/Auth")

//Routes middleware
app.use("/api/user", AuthRoute)
 
app.listen(5000,()=>{console.log("server is running");})