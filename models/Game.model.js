const { Schema, model } = require("mongoose");
const Category = require('../models/Categories.model.js')

const gameSchema = new Schema(
  {
id:String,
title:String,
year:Number,
platforms:Array,
cover:Object,
categoriesID:[{ type: Schema.Types.ObjectId, ref: 'Category' }],
categories_id:Array,

  }, { timestamps: true, });

const Game = model("Game", gameSchema);

module.exports = Game;