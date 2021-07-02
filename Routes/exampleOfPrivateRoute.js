const router = require("express").Router()
const verify =require("../middleware/verifyToken")
router.get("/", verify,(req,res) => {
     res.json({
          post: "first post",
     data:"you should not access"})
})
module.exports = router;