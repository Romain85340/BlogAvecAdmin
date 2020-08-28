const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    role: {
        type: Number,
        default: 1,
    },
    googleId: {
        type: String,
        required: false,
    },
    displayName: {
        type: String,
        required: false,
      },
      firstName: {
        type: String,
        required: false,
      },
      lastName: {
        type: String,
        required: false,
      },
      image: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

const User = mongoose.model("User", UserSchema);

module.exports = User;