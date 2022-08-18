const { getMaxListeners } = require("../app");
const SpeedrunClient = require('../node_modules/node-speedrun/lib/Client')
const speedrun = new SpeedrunClient()
const Game = require('../models/Game.model.js')


const router = require("express").Router();

router.get("/list", (req, res, next) => {
  Game.find().sort({title:1})
    .populate("categoriesID")
    .then((gamesFromDB) => { 
      console.log("gamesfromdb:",gamesFromDB)
      res.render('games',{games:gamesFromDB}) })

});

router.get("/new", (req, res, next) => {
  res.render("game-new")
})

router.get("/:id/edit", (req, res, next) => {
  Game.findById(req.params.id)
  .populate("categoriesID")
  .then((gameFromDB)=>{
    res.render("game-edit",{game:gameFromDB});
  })
});

router.post("/:id/edit",(req,res,next)=>{
  const {id} = req.params;
  const {title,year,cover} = req.body;
  Game.findByIdAndUpdate(id,{title,year,cover},{new:true})
  .then((updatedGame)=>{
    console.log(updatedGame)
    res.redirect(`/game/${updatedGame._id}`)
  })
  .catch((err)=>{
    console.log('error updating game', err)
    next(err)
  })
  
})

router.get("/:id", (req, res, next) => {
  Game.findById(req.params.id)
    .populate("categoriesID")
    .then((gameFromDB)=>{
      res.render("game",{game:gameFromDB})
    })
  
})

module.exports = router;