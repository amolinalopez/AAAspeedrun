const router = require("express").Router();



/* GET profile page */
router.get("/", (req, res, next) => {
  res.render("profile",);
});

router.get("/edit",(req,res,next)=>{
  res.render("profile-edit")
})

router.get("/favorites", (req, res, next) => {
  res.render("profile-fav");
});

module.exports = router;