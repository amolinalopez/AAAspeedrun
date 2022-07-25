const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("homepage");
});

/* GET about page */
router.get("/about",(req,res,next)=>{
  res.render("about");
})

/* GET login page */
router.get("/login",(req,res,next)=>{
  res.render("login")
})
module.exports = router;
