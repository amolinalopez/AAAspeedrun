const { getMaxListeners } = require("../app");
const SpeedrunClient = require('../node_modules/node-speedrun/lib/Client')
const speedrun = new SpeedrunClient()
const Game = require('../models/Game.model.js')


const router = require("express").Router();

router.get("/list", (req, res, next) => {
  Game.find()
    .populate(categories)
    .then(() => { res.render('games') })

});

router.get("/new", (req, res, next) => {
  res.render("game-new")
})

router.get("/:id/edit", (req, res, next) => {
  Game.findById(req.params.id)
  .then(()=>{
    res.render("game-edit");
  })
});

router.post("/:id/edit",(req,res,next)=>{
  res.redirect("/:id")
})

router.get("/:id", (req, res, next) => {
  Game.findById(req.params.id)
    .populate("categories")
  res.render("game")
})

module.exports = router;