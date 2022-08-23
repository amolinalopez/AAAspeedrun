const router = require("express").Router();
const Runs = require('../models/Run.model.js')
const bcryptjs = require('bcryptjs');
const User = require("../models/User.model");
const saltRounds = 10;
const salt = bcryptjs.genSaltSync(saltRounds)
const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;


/* GET signup page */
router.get("/signup", (req, res, next) => {
  res.render("signup")
})

router.post("/signup", (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body
  const hashedPassword = bcryptjs.hashSync(password, salt)
  console.log('Hashed Password=', hashedPassword)
  if (password != confirmPassword) {
    res.render('signup', { errorMessage: 'Password and confirmation must match, please try again.' });
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
    username, email, password: hashedPassword
  })
    .then(userFromDB => {
      console.log('New user created:', userFromDB)
      res.render('signup')
    })
    .catch(err => {
      console.log("err:", err)
      next(err)
    })
})

// GET login page
router.get("/login", (req, res, next) => {
  res.render("login")
})

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
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
      } else if (bcryptjs.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect(`/user/${user._id}`);
      } else {
        res.render('login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => {
      console.log("err=", error)
      next(error)
    });
});


/* GET profile page */
// router.get("/profile", (req, res, next) => {
//   console.log("user:", req.session.currentUser)
//   const user = req.session.currentUser
//   Runs
//     .find({ userID: user._id }).sort({ date: -1 }).limit(10)
//     .populate("userID")
//     .populate("categoryID")
//     .populate("gameID")
//     .then((runsfromDB) => {
//       res.render("profile", { user: req.session.currentUser, runs: runsfromDB })
//     });
// });


router.get("/:id", (req, res, next) => {
  console.log("user:", req.session.currentUser)
  const user = req.session.currentUser
  Runs
    .find({ userID: user._id }).sort({ date: -1 })
    .populate("userID")
    .populate("categoryID")
    .populate("gameID")
    .then((runsfromDB) => {
      res.render("profile", { user: req.session.currentUser, runs: runsfromDB })
    });
});

router.get("/:id/edit", (req, res, next) => {
  res.render("profile-edit", { user: req.session.currentUser })
})

router.post("/:id/edit",(req,res,next)=>{
  const {id} = req.params;
  const {name,email,avatar,country} = req.body;
  User.findByIdAndUpdate(id,{name,email,avatar,country},{new:true})
  .then((updatedUser)=>{
    console.log(updatedUser)
    res.redirect(`/user/${updatedUser._id}`,{user:req.session.currentUser})
  })
  .catch((err)=>{
    console.log('error updating game', err)
    next(err)
  })
  
})

router.get("/:id/favorites", (req, res, next) => {
  res.render("profile-fav", { user: req.session.currentUser });
});


/* POST logout page */

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


module.exports = router;