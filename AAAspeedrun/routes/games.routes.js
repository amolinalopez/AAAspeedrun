const router = require("express").Router();

router.get("/", (req, res, next) => {
    res.render("games");
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