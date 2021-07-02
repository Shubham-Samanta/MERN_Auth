const jwt = require('jsonwebtoken')

async function auth (req, res, next)
{
     const token = req.header('auth-token')
     if (!token)
     {
          res.status(401).send("access denied")
     }
     else
     {
          try {
               const verified = jwt.verify(token, process.env.TOKEN_SECRET)
               req.user = verified
               next()
          }
          catch (err){
               res.status(401).send("access denied")
          }
     }
     
}
module.exports=auth