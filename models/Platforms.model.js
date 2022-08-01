const { Schema, model } = require("mongoose");

const platformSchema = new Schema(
  {
id:String,
name:String,
}, { timestamps: true, });

const Platform = model("Platform", platformSchema);

module.exports = Platform;