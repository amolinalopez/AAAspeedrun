const Game = require('../models/Game.model.js')
const Category = require('../models/Categories.model.js')
const Run = require('../models/Run.model.js')
const fileUploader = require('../config/cloudinary.config');


const router = require("express").Router();

router.get("/list", (req, res, next) => {
  Game.find().sort({ title: 1 })
    .populate("categoriesID")
    .then((gamesFromDB) => {
      //console.log("gamesfromdb:",gamesFromDB)
      res.render('games', { games: gamesFromDB, user: req.session.currentUser })
    })

});


router.get("/new", (req, res, next) => {
  res.render("game-new",{user:req.session.currentUser})
})

router.post("/new", fileUploader.single('cover'), (req, res, next) => {
  const { title, year } = req.body
  console.log("req.file",req.file)
  Game.create({ title, year, cover:req.file.path })
    .then((newGame) => {
      console.log("newGame",newGame)
      res.redirect(`/game/${newGame._id}`)
    })
    .catch((err) => {
      console.log("error creating new game :", err)
      next(err)
    })
})

router.get("/category/:id/newrun", (req, res, next) => {
  Category.findById(req.params.id)
    .then((categoryFromDB) => {
      res.render("run-new", { category: categoryFromDB })
    })
    .catch((err) => {
      console.log("err", err)
      next(err)
    })
})

router.post("/category/:id/newrun", (req, res, next) => {

  const userID = req.session.currentUser._id
  const { time_seconds, video } = req.body

  Game.findOne({ categoriesID: req.params.id })
    .then((gameFromDB) => {
      Run.create({ userID:req.session.currentUser._id, time_seconds, video, categoryID: req.params.id, gameID: gameFromDB._id })
        .then((createdRun) => {
          res.redirect(`/game/category/${req.params.id}`)
        })
        .catch((err) => {
          console.log("err", err)
          next(err)
        })
    })
    .catch((err) => {
      console.log("err", err)
      next(err)
    })

})

router.get("/category/:id", (req, res, next) => {
  Category.findById(req.params.id)
    .then((categoryFromDB) => {
      console.log("catfromdb:", categoryFromDB)
      Run.find({ categoryID: categoryFromDB._id }).sort({ time_seconds: 1 })
        .populate("userID")
        .populate("gameID")
        .then((runsFromDB) => {
          console.log("runsFromDB:", runsFromDB)
          res.render('category', { category: categoryFromDB, runs: runsFromDB, user: req.session.currentUser })
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
      res.render("game-edit", { game: gameFromDB, user: req.session.currentUser });
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
      res.render('category-new', { game: gameFromDB, user: req.session.currentUser })
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
      res.render("game", { game: gameFromDB, user: req.session.currentUser })
    })
})

router.get("/:id/category", (req, res, next) => {
  Game.findById(req.params.id)
    .populate("categoriesID")
    .then((gameFromDB) => {
      res.render("game", { game: gameFromDB, user: req.session.currentUser })
    })
})


module.exports = router;