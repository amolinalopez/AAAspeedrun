const router = require("express").Router();



/* GET profile page */
router.get("/", (req, res, next) => {
  console.log("req.session.currentUser:",req.session.currentUser)
  res.render("profile",{user:req.session.currentUser});
});

router.get("/edit",(req,res,next)=>{
  res.render("profile-edit",{user:req.session.currentUser})
})

router.get("/favorites", (req, res, next) => {
  res.render("profile-fav",{user:req.session.currentUser});
});

module.exports = router;