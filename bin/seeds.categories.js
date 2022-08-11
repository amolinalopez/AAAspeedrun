const mongoose = require("mongoose");
const Category = require("../models/Categories.model")
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/AAAspeedrun";
const categoriesData = require('../data/categories.json')
const categories = categoriesData.filter((el) => el).map((el) => {
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
    await Category.deleteMany()
    .then(()=>console.log('DB cleared'))
    .catch((err)=>console.log('Error cleaning DB', err))
    
    //création de la DB
    await Category.create(categories)
    .then((categoriesFromDB) => {
      console.log(`Created ${categoriesFromDB.length} categories`);
      //fermeture de la connection à la DB
      mongoose.connection.close();
      console.log('connection to DB closed')
    })
    .catch((err) =>
      console.log(`An error occurred while creating categories from the DB: ${err}`)
    );
  }
  
  
  //on oublie pas d'appeler la fonction qu'on vient de créer!
  main().catch(err => console.log(err))