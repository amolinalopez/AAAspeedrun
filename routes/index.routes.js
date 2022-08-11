const router = require("express").Router();
const axios = require("axios")
const Runs=require('../models/Run.model.js')

/* GET home page */
router.get("/", (req, res, next) => {
  Runs.find().sort({date:-1}).limit(20)
  .populate("categoryID")
  .populate("gameID")
  .then(allRunsFromDB=>{
    console.log("allRunsFromDB:",allRunsFromDB)
    res.render("homepage",{runs:allRunsFromDB})
  })
    .catch(err => {
      console.log("error:", err)
      next(err)
    })

});

/* GET about page */
router.get("/about", (req, res, next) => {
  res.render("about");
})

/* GET error page */
router.get("/error", (req, res, next) => {
  res.render("error");
})


/* GET signup page */
const bcryptjs = require('bcryptjs');
const User = require("../models/User.model");
const saltRounds = 10;
const salt = bcryptjs.genSaltSync(saltRounds)
const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

router.get("/signup", (req, res, next) => {
  res.render("signup")
})

router.post("/signup", (req, res, next) => {
  console.log('the form data:', req.body.username)
  const { username, email, password, confirmPassword } = req.body
  const hashedPassword = bcryptjs.hashSync(password, salt)
  console.log('Hashed Password=', hashedPassword)
  if (password != confirmPassword){
    res.render('signup',{errorMessage:'Password and confirmation must match, please try again.'});
    console.log("wrong confirmation")
    return
  }
  if (!username || !email || !password || !confirmPassword) {
    res.render('signup', { errorMessage: 'All fields are mandatory. Please provide your username, email, password and password confirmation' });
    console.log("a field is empty")
    return;
  }
  if (!regex.test(password)) {
    res.render('signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
    console.log("wrong format")
    return;
  }
  User.create({
    username, email, passwordHash: hashedPassword
  })
    .then(userFromDB => {
      console.log('New user created:', userFromDB)
      res.render('signup')
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
})

// GET login page
router.get("/login", (req, res, next) => {
  res.render("login")
})

router.post("/login", (req, res, next) => {
  const { username, email, password } = req.body;
  console.log('SESSION =====> ', req.session)
  if (email === '' || password === '') {
    res.render('login', {
      errorMessage: 'Please enter both, email and password to login.'
    });
    return;
  }
  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.render('login', { errorMessage: 'Email is not registered. Try with other email.' });
        return;
      } else if (bcryptjs.compareSync(password, user.passwordHash)) {
        req.session.currentUser = user;
        res.redirect('/profile');
      } else {
        res.render('login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
});

module.exports = router;
