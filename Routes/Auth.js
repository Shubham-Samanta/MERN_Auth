const router = require("express").Router()
const userModel = require("../Models/User")
const { registerValidation, loginValidation } = require("../Models/Validation")
const bycrypt=require("bcrypt")


//REGISTER
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

     //Hashing the password
               const salt = await bycrypt.genSalt(10)
               const hashedpassword=await bycrypt.hash(req.body.password,salt)
     //creating a new user
          
          const name = req.body.name
          const email = req.body.email
          const password = hashedpassword
          const newUser = new userModel({name,email,password});
          try {const hola= await newUser.save()
               res.send({user:hola._id})}
          catch (err) { res.status(400).send(err) }
          }
     }     
})


//LOGIN

router.post("/login",async (req, res) => {
     //Login Validation
     const { error } = loginValidation(req.body)
     
     if (error)
     {
          res.status(400).send(error.details[0].message)
     }
     else
     {
          //Check if email is there in DB
          const user = await userModel.findOne({ email: req.body.email })
          if (!user)
          {
               res.status(400).send("email not found")
          }
          else {
               //Check if the password is correct
               const validPassword = await bycrypt.compare(req.body.password, user.password)
               if (!validPassword)
               {
                    res.status(400).send("invalid password")
               }
               else {
                    res.status(200).send("logged in")
               }

          }
     }
})
module.exports = router;