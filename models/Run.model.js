const { Schema, model } = require("mongoose");

const runSchema = new Schema(
  {
_id:{type:Schema.Types.ObjectId},
userID:{type:Schema.Types.ObjectId},
time_ms:Number,
date:Date,
proof_url:String,
category:{type:Schema.Types.ObjectId},

  }, { timestamps: true, });

const Run = model("Run", runSchema);

module.exports = Run;
