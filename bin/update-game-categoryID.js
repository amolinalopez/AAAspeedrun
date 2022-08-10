const mongoose = require("mongoose");
const Category = require("../models/Categories.model.js");
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/AAAspeedrun";
const Game = require('../models/Game.model.js')

async function main() {
    //connection a mongoose
    await mongoose
        .connect(MONGO_URI)
        .then(() => console.log("Connected to DB"))
        .catch((err) => console.log("Error connecting to DB", err));

    // Retrieve all runs
    const games = await Game.find()
    
    async function mapGameCategory(gameCategory) {
        console.log('mapGameCategory', gameCategory)
        const iterator = gameCategory.values()
        const results=[]
        for (const value of iterator) {
            
            console.log("value=", value);
            let cat = await Category.findOne({ id: value })
            console.log("cat=", cat)
            if (cat === null) {
                
                cat={}
                throw new Error('ECAT_MISMATCHING')
            }
            
            console.log('cat._id=', cat._id)
            results.push(cat._id)
            console.log("results=",results)
        }

        return results// Category._id
    }

    //updater les runs:
    // pour chaque run, aller chercher le Category.id correspondant au Run.category
    let count = 0
    for (let game of games) {
        console.log('game.category_id=', game.categories_id)
        const _id = await mapGameCategory(game.categories_id).catch((err) => {     
            console.log("err=", err)
            // if (err.message === 'ECAT_MISMATCHING') 
            if (cat === {}) 
            {
                console.log('remove this one')
                count += 1
                console.log("count=", count)
                game.remove()
            }
        })
        console.log('_id=', _id)
        for (let i=0;i<_id.length;i++){
            game.categoriesID.push(_id[i])
        }
        // maj run
        
        console.log("game:", game)
        await game.save()
    }

}

//on oublie pas d'appeler la fonction qu'on vient de crÃ©er!
main().catch(err => console.log(err))
