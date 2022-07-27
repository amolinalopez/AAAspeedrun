const router = require("express").Router();
const axios = require("axios")

/* GET home page */
router.get("/", (req, res, next) => {
   axios.get('https://speedrun.com/api/v1/runs?max=6&status=verified&orderby=verify-date&direction=desc')
   .then((response)=>{
    console.log(`${response.data.data[0].id}`)
    res.render("homepage",{run:response.data.data});
   })
   .catch(err=>{
    console.log("error:",err)
    next(err)
   })
  
});

/* GET about page */
router.get("/about", (req, res, next) => {
  res.render("about");
})


/* GET login page */
const bcryptjs = require('bcryptjs');
const User = require("../models/User.model");
const saltRounds = 10;
const salt = bcryptjs.genSaltSync(saltRounds)

router.get("/login", (req, res, next) => {
  res.render("login")
})

router.post("/signup", (req, res, next) => {
  console.log('the form data:', req.body.email)
  const { username, email, password } = req.body
  const hashedPassword = bcryptjs.hashSync(password, salt)
  console.log('Hashed Password=', hashedPassword)
  User.create({
    username, email, passwordHash: hashedPassword
  })
    .then(userFromDB => {
      console.log('New user created:', userFromDB)
      res.render('login')
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
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
