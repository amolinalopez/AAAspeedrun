const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
id:String,
name:String,
gameID:String,

  }, { timestamps: true, });

const Category = model("Category", categorySchema);

module.exports = Category;