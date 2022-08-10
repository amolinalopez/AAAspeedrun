const { Schema, model } = require("mongoose");
const Category = require('../models/Categories.model.js')
const Game=require('../models/Game.model.js')
const runSchema = new Schema(
  {
    id: String,
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    user_id:String,
    time_seconds: Number,
    date: Date,
    video: String,
    categoryID:{ type: Schema.Types.ObjectId, ref: 'Category' },
    category_id: String,
    gameID:{ type: Schema.Types.ObjectId, ref: 'Game' },
    game_id:String,

  }, { timestamps: true, });

const Run = model("Run", runSchema);

module.exports = Run;
