const { getMaxListeners } = require("../app");
const SpeedrunClient = require('../node_modules/node-speedrun/lib/Client')
const speedrun = new SpeedrunClient()


const router = require("express").Router();

router.get("/", (req, res, next) => {
    speedrun.games.get('https://www.speedrun.com/api/v1/games')
    .then((gamefromAPI)=>{
        res.render("games",{game:gamefromAPI});
        console.log(gamefromAPI)
    })
    
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