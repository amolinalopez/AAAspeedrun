const router = require("express").Router();
const Runs = require('../models/Run.model.js')



/* GET profile page */
router.get("/", (req, res, next) => {
  console.log("user:", req.session.currentUser)
  const user = req.session.currentUser
  Runs
    .find({ userID: user._id }).sort({date:-1}).limit(20)
    .populate("userID")
    .populate("categoryID")
    .populate("gameID")
    .then((runsfromDB) => {
      res.render("profile", { user: req.session.currentUser, runs: runsfromDB })
    });
});

router.get("/edit", (req, res, next) => {
  res.render("profile-edit", { user: req.session.currentUser })
})

router.get("/favorites", (req, res, next) => {
  res.render("profile-fav", { user: req.session.currentUser });
});

module.exports = router;