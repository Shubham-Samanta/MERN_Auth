const router = require("express").Router()
const userModel = require("../Models/User")
const {registerValidation,loginValidation}= require("../Models/Validation")

router.post('/register', async (req, res) => {
     // Register validation
     const { error } = registerValidation(req.body)
     
     if (error)
     {
          res.status(400).send(error.details[0].message)}
     else {
          //checking if same email existes in DB
          const emailExist = await userModel.findOne({ email: req.body.email })
          if (emailExist)
          {
               res.status(400).send("email already exists")
          }
          else {
          //creating a new user
          
          const name = req.body.name
          const email = req.body.email
          const password = req.body.password
          const newUser = new userModel({name,email,password});
          try {const hola= await newUser.save()
               res.send(hola)}
          catch (err) { res.status(400).send(err) }
          }
     }     
})
module.exports = router;