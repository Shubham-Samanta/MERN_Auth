const router = require("express").Router()
const userModel = require("../Models/User")

router.get("/register", (req, res) => {
     res.status(200).send("all good")
})

router.post('/register',async(req, res)=> {
     const name = req.body.name
     const email = req.body.email
     const password = req.body.password
     const newUser = new userModel({name,email,password});
     try {const hola= await newUser.save()
          res.send(hola)}
     catch (err){res.status(400).send(err)}    
})
module.exports = router;