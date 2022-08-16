const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'email is required.'],
      unique: true
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'password is required.'],
    },
    premium: { type: Boolean, default: false },
    paymentToken: {type: String, default:""},
    coins: { type: Number, default: 0 },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
    avatar : {type:String,default:"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}

  }, { timestamps: true, });

const User = model("User", userSchema);

module.exports = User;
