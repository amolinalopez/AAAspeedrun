const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/AAAspeedrun";
const Category = require("../models/Categories.model.js");
const Runs = require("../models/Runs.model.js")

async function main() {
    //connection a mongoose
    mongoose
        .connect(MONGO_URI)
        .then((
        ) => {
            console.log("Connected to DB")
            Runs.find()
            .then(()=>{
                Category.find()
            })
            .catch()})
        .catch((err) => console.log("Error connecting to DB", err));


}


//find runs
//find categories
//si run.categoryID = category._id
//-> continue
//sinon category.remove