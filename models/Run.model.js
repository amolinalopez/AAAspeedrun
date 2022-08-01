const { Schema, model } = require("mongoose");

const runSchema = new Schema(
  {
id:String,
userID:String,
time_seconds:Number,
date:Date,
video:String,
category:String,

  }, { timestamps: true, });

const Run = model("Run", runSchema);

module.exports = Run;
