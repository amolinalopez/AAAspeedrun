const mongoose = require("mongoose");
const Game = require("../models/Game.model")
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/AAAspeedrun";
const gamesData = require('../data/games.json')
const games = gamesData.filter((el) => el).map((el) => {
   let cat = el.categories.data.map((el2)=>{
        return el2.id
    })
        return {
            id: el.id,
            title: el.names.international,
            year: el.released,
            platforms: el.platforms,
            cover: el.assets['cover-large'].uri,
            categories_id: cat,
            categoriesID: []
        }
    }
)

console.log()
//fonction asynchone pour l'accès a la DB
async function main() {
    //connection a mongoose
    await mongoose
        .connect(MONGO_URI)
        .then(() => console.log("Connected to DB"))
        .catch((err) => console.log("Error connecting to DB", err));

    //nettoyage de la DB
    await Game.deleteMany()
        .then(() => console.log('DB cleared'))
        .catch((err) => console.log('Error cleaning DB', err))

    //création de la DB
    await Game.create(games)
        .then((gamesFromDB) => {
            console.log(`Created ${games.length} games`);
            //fermeture de la connection à la DB
            mongoose.connection.close();
            console.log('connection to DB closed')
        })
        .catch((err) =>
            console.log(`An error occurred while creating games from the DB: ${err}`)
        );
}


//on oublie pas d'appeler la fonction qu'on vient de créer!
main().catch(err => console.log(err))