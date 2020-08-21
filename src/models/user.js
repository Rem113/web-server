const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true
  },
  isManager: {
    type: Boolean,
    default: false,
  },
})

module.exports = model("User", UserSchema, "Users")
