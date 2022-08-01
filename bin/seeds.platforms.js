const mongoose = require("mongoose");
const Platform = require("../models/Platforms.model")
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/AAAspeedrun";
const platformsData = require('../data/platforms.json')
const platforms = platformsData.filter((el) => el).map((el) => {
  return {
      id:el.id,
      name:el.name,
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
    await Platform.deleteMany()
    .then(()=>console.log('DB cleared'))
    .catch((err)=>console.log('Error cleaning DB', err))
    
    //création de la DB
    await Platform.create(platforms)
    .then((platformsFromDB) => {
      console.log(`Created ${platformsFromDB.length} platforms`);
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