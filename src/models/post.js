const { Schema, model } = require("mongoose")

const PostSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  replyTo: {
    type: String,
  },
})

module.exports = model("Post", PostSchema, "Posts")
