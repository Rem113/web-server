const { Schema, model } = require("mongoose")

const PostSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  }
})

module.exports = model("Post", PostSchema, "Posts")
