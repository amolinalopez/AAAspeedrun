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
    const categories = await Category.find()

    async function mapCategoryRun(categoryRun) {
        console.log('mapCategoryRun', categoryRun)
        const run = await Run.findOne({ categoryID: categoryRun._id })

        if (run === null) {
            throw new Error('EGAM_MISMATCHING')
        }

        console.log('run._id=', run._id)

        return run._id // Category._id
    }

    //updater les runs:
    // pour chaque run, aller chercher le Category.id correspondant au Run.category
    let count = 0
    for (let category of categories) {
        const _id = await mapCategoryRun(category).catch((err) => {

            console.log("err=", err)
            
            if (err.message === 'EGAM_MISMATCHING') {
                
                console.log('remove this one')
                count+=1
                console.log("count=",count)
                category.remove()
            }


        })
        // console.log('_id=', _id)
        // console.log("run:",run)
       // await category.save()
    }
    
}

//on oublie pas d'appeler la fonction qu'on vient de créer!
main().catch(err => console.log(err))