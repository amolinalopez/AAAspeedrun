const mongoose = require("mongoose");
const Category = require("../models/Categories.model.js");
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/AAAspeedrun";
const Run = require('../models/Run.model.js')

async function main() {
    //connection a mongoose
    await mongoose
        .connect(MONGO_URI)
        .then(() => console.log("Connected to DB"))
        .catch((err) => console.log("Error connecting to DB", err));

    // Retrieve all runs
    const runs = await Run.find()

    async function mapRunCategory(runCategory) {
        console.log('mapRunCategory', runCategory)
        const cat = await Category.findOne({ id: runCategory })

        if (cat === null) {
            throw new Error('ECAT_MISMATCHING')
        }

        console.log('cat._id=', cat._id)

        return cat._id // Category._id
    }

    //updater les runs:
    // pour chaque run, aller chercher le Category.id correspondant au Run.category
    let count = 0
    for (let run of runs) {
        console.log('run.category_id=', run.category_id)
        const _id = await mapRunCategory(run.category_id).catch((err) => {

            console.log("err=", err)
            
            if (err.message === 'ECAT_MISMATCHING') {
                
                console.log('remove this one')
                count+=1
                console.log("count=",count)
                run.remove()
            }


        })
        console.log('_id=', _id)

        // maj run
        run.categoryID = _id
        console.log("run:",run)
        await run.save()
    }
    
}

//on oublie pas d'appeler la fonction qu'on vient de créer!
main().catch(err => console.log(err))