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
    passwordHash: {
      type: String,
      trim: true,
      required: [true, 'password is required.'],
    },
    premium: { type: Boolean, default: false },
    paymentToken: {type: String, default:""},
    coins: { type: Number, default: 0 },
    // favorites: [{ type: Schema.Types.ObjectId, ref: 'Game' }],

  }, { timestamps: true, });

const User = model("User", userSchema);

module.exports = User;
