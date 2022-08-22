const { getMaxListeners } = require("../app");
const SpeedrunClient = require('../node_modules/node-speedrun/lib/Client')
const speedrun = new SpeedrunClient()
const Game = require('../models/Game.model.js')
const Category = require('../models/Categories.model.js')
const Run = require('../models/Run.model.js')


const router = require("express").Router();

router.get("/list", (req, res, next) => {
  Game.find().sort({ title: 1 })
    .populate("categoriesID")
    .then((gamesFromDB) => {
      //console.log("gamesfromdb:",gamesFromDB)
      res.render('games', { games: gamesFromDB })
    })

});


router.get("/new", (req, res, next) => {
  res.render("game-new")
})

router.post("/new", (req, res, next) => {
  const { title, year, cover } = req.body
  Game.create({ title, year, cover })
    .then((newGame) => {
      res.redirect(`/game/${newGame._id}`)
    })
    .catch((err) => {
      console.log("error creating new game :", err)
      next(err)
    })
})

router.get("/category/:id/newrun",(req,res,next)=>{
  Category.findById(req.params.id)
  .then((categoryFromDB)=>{
    res.render("run-new",{category:categoryFromDB})
  })
  .catch((err)=>{
    console.log("err",err)
    next(err)
  })
})

router.post("/category/:id/newrun",(req,res,next)=>{
  const {userID}=req.session
  const {time_seconds,video}=req.body
  Run.create({userID,time_seconds,video,categoryID:req.params.id})
  .then((createdRun)=>{
    console.log('run created:',createdRun)
    res.redirect(`/category/${createdRun.categoryID}`)
  })
  .catch((err)=>{
    console.log("err",err)
    next(err)
  })
})

router.get("/category/:id", (req, res, next) => {
  Category.findById(req.params.id)
    .then((categoryFromDB) => {
      console.log("catfromdb:",categoryFromDB)
      Run.find({ categoryID: categoryFromDB._id }).sort({time_seconds:1})
        .populate("userID")
        .populate("gameID")
        .then((runsFromDB) => {
          console.log("runsFromDB:",runsFromDB)
          res.render('category', { category: categoryFromDB, runs: runsFromDB })
        })
        .catch((err) => {
          console.log('err:', err)
          next(err)
        })
    })
    .catch((err) => {
      console.log('err:', err)
      next(err)
    })
})

router.get("/:id/edit", (req, res, next) => {
  Game.findById(req.params.id)
    .populate("categoriesID")
    .then((gameFromDB) => {
      res.render("game-edit", { game: gameFromDB });
    })
});

router.post("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { title, year, cover } = req.body;
  Game.findByIdAndUpdate(id, { title, year, cover }, { new: true })
    .then((updatedGame) => {
      console.log(updatedGame)
      res.redirect(`/game/${updatedGame._id}`)
    })
    .catch((err) => {
      console.log('error updating game', err)
      next(err)
    })

})

router.get('/:id/newcategory', function (req, res, next) {
  Game.findById(req.params.id)
    .then((gameFromDB) => {
      res.render('category-new', { game: gameFromDB })
    });
});

router.post('/:id/newcategory', function (req, res, next) {
  const { id } = req.params;
  const { name } = req.body;
  Category.create({ name })
    .then((newCategory) => {
      Game.findByIdAndUpdate(id, { categoriesID: newCategory._id })
        .then((updatedGame) => {
          res.redirect(`/game/${updatedGame._id}`)
        })
        .catch((err) => {
          console.log("error updating game categories", err)
          next(err)
        })
    })
    .catch((err) => {
      console.log("error creating new category:", err)
      next(err)
    })
});

router.get("/:id", (req, res, next) => {
  Game.findById(req.params.id)
    .populate("categoriesID")
    .then((gameFromDB) => {
      res.render("game", { game: gameFromDB })
    })
})

router.get("/:id/category", (req, res, next) => {
  Game.findById(req.params.id)
    .populate("categoriesID")
    .then((gameFromDB) => {
      res.render("game", { game: gameFromDB })
    })
})


module.exports = router;