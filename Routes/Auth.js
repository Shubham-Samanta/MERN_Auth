const router = require("express").Router()
const userModel = require("../Models/User")
const Joi= require("joi")

const schema = Joi.object({
     name: Joi.string().min(6).required().alphanum(),
     email: Joi.string().min(6).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
     password:Joi.string().required().min(6)
 });

router.post('/register', async (req, res) => {
     //validation
     const { error, value } = schema.validate(req.body);
     if (error)
     {
          res.send(error.details[0].message)}
     else {
          const name = req.body.name
          const email = req.body.email
          const password = req.body.password
          const newUser = new userModel({name,email,password});
          try {const hola= await newUser.save()
               res.send(hola)}
          catch (err) { res.status(400).send(err) }
     }
     
     
})
module.exports = router;