const mongoose = require("mongoose");
const Run = require("../models/Run.model")

mongoose
  .connect("mongodb://localhost/AAAspeedrun")
  .then(function() {
    console.log('connected to the DB')
  })
  .then(function () {
    Run.create()
        .then(()=>{
            console.log()
            mongoose.connection.close();
        })
        .catch(err=>{
            console.log('error:',err)
            next(err)
        })
  })
  .catch((err) => console.log("oops connecting", err));

