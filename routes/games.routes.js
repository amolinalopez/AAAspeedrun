const { getMaxListeners } = require("../app");
const SpeedrunClient = require('../node_modules/node-speedrun/lib/Client')
const speedrun = new SpeedrunClient()
const Game=require('../models/Game.model.js')


const router = require("express").Router();

router.get("/list", (req, res, next) => {
  Game.find()
  .populate("categories")
  res.render('games')
  });

router.get("/new",(req,res,next)=>{
    res.render("game-new")
})

router.get("/edit", (req, res, next) => {
    res.render("game-edit");
  });

router.get("/:id",(req,res,next)=>{
    res.render("game")
})

module.exports = router;