const { getMaxListeners } = require("../app");
const SpeedrunClient = require('../node_modules/node-speedrun/lib/Client')
const speedrun = new SpeedrunClient()


const router = require("express").Router();

router.get("/list", (req, res, next) => {
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