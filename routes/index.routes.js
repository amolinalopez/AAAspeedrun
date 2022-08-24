const router = require("express").Router();
const Runs=require('../models/Run.model.js')
const Game=require('../models/Game.model.js')
const User=require('../models/User.model.js')

/* GET home page */
router.get("/", (req, res, next) => {
  console.log('req.session:',req.session)
  Runs.find().sort({date:-1}).limit(20)
  .populate("categoryID")
  .populate("gameID")
  .populate("userID")
  .then(allRunsFromDB=>{
    //console.log("allRunsFromDB:",allRunsFromDB)
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
  res.render("error",{user:req.session.currentUser});
})

router.get("/search",(req,res,next)=>{
  const search = req.query.search
  console.log("req.query.search :",search)
  Game.find({title:search})
  .then((gameFromDB)=>{
    console.log("game:",gameFromDB)
    const gameID=gameFromDB[0]._id.toString()
    console.log("ID:",gameID)
    res.redirect(`/game/${gameID}`)
  })
  .catch((err)=>{
    User.find({username:search})
    .then((userFromDB)=>{
      console.log("user:",userFromDB)
      const userID = userFromDB[0]._id.toString()
      res.redirect(`/user/${userID}`)
    })
    .catch((err)=>{
      console.log("err",err)
      next(err)
    })
    console.log("err",err)
    next(err)
  })
})

module.exports = router;
