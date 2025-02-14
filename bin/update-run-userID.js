const mongoose = require("mongoose");
const User = require("../models/User.model.js");
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
    const users =  await User.find()

    async function getRandomUserID(userslist){
        return userslist[Math.floor(Math.random() * userslist.length)]._id;
    }

    console.log('users=',users)



    // async function mapRunUser(runUser) {
    //     console.log('mapRunUser', runUser)

    //     if (use === null) {
    //         throw new Error('EGAM_MISMATCHING')
    //     }

    //     console.log('use._id=', use._id)

    //     return use._id // Category._id
    // }

    // //updater les runs:
    // // pour chaque run, aller chercher le Category.id correspondant au Run.category
    // let count = 0
    for (let run of runs) {
        console.log('run.user_id=', run.user_id)
        
        const _id = await getRandomUserID(users).catch((err) => {

            console.log("err=", err)
            
            if (err.message === 'EGAM_MISMATCHING') {
                
                console.log('remove this one')
                count+=1
                console.log("count=",count)
                run.remove()
            }


        })
        console.log('_id=', _id)

        // maj run
        run.userID = _id
        console.log("run:",run)
        await run.save()
    }
    
}

//on oublie pas d'appeler la fonction qu'on vient de créer!
main().catch(err => console.log(err))