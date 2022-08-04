const mongoose = require("mongoose");
const Run = require("../models/Run.model")
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/AAAspeedrun";
const runsData = require('../data/runs.json')
const runs = runsData.filter((el) => {
  return el.videos && el.videos.links
}).map((el) => {
  return {
      userID: el.players[0].id,
      time_seconds: el.times.realtime_t,
      date : el.date,
      video : el.videos.links[0].uri,
      category : el.category,
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
    await Run.deleteMany()
    .then(()=>console.log('DB cleared'))
    .catch((err)=>console.log('Error cleaning DB', err))
    
    //création de la DB
    await Run.create(runs)
    .then((runsFromDB) => {
      console.log(`Created ${runsFromDB.length} runs`);
      //fermeture de la connection à la DB
      mongoose.connection.close();
      console.log('connection to DB closed')
    })
    .catch((err) =>
      console.log(`An error occurred while creating runs from the DB: ${err}`)
    );
  }
  
  //on oublie pas d'appeler la fonction qu'on vient de créer!
  main().catch(err => console.log(err))