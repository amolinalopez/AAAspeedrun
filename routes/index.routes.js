const router = require("express").Router();
const Runs=require('../models/Run.model.js')

/* GET home page */
router.get("/", (req, res, next) => {
  console.log('req.session:',req.session)
  Runs.find().sort({date:-1}).limit(20)
  .populate("categoryID")
  .populate("gameID")
  .populate("userID")
  .then(allRunsFromDB=>{
    console.log("allRunsFromDB:",allRunsFromDB)
    res.render("homepage",{runs:allRunsFromDB,user:req.session.currentUser})
  })
    .catch(err => {
      console.log("error:", err)
      next(err)
    })

});

/* GET about page */
router.get("/about", (req, res, next) => {
  res.render("about",{user:req.session.currentUser});
})

/* GET error page */
router.get("/error", (req, res, next) => {
  res.render("error");
})

module.exports = router;
