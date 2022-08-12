const mongoose = require("mongoose");
const User = require("../models/User.model")
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/AAAspeedrun";
const usersData = require('../data/users.json')
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const salt = bcryptjs.genSaltSync(saltRounds)

const users = usersData.filter((el) => el).map((el) => {
    
    let hashedPassword= bcryptjs.hashSync(el.password,salt)

  return {
      username:el.username,
      email:el.email,
      password: hashedPassword,
      premium:el.premium,
      paymentToken:el.paymentToken,
      coins:el.coins
  }
})

//fonction asynchone pour l'accès a la DB
async function main() {
    //connection a mongoose
    await mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log("Error connecting to DB",err));
  
    //nettoyage de la DB
    await User.deleteMany()
    .then(()=>console.log('DB cleared'))
    .catch((err)=>console.log('Error cleaning DB', err))
    
    //création de la DB
    await User.create(users)
    .then((usersFromDB) => {
      console.log(`Created ${usersFromDB.length} users`);
      //fermeture de la connection à la DB
      mongoose.connection.close();
      console.log('connection to DB closed')
    })
    .catch((err) =>
      console.log(`An error occurred while creating platforms from the DB: ${err}`)
    );
  }
  
  
  //on oublie pas d'appeler la fonction qu'on vient de créer!
  main().catch(err => console.log(err))