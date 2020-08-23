const { Schema, model } = require("mongoose")

const CommentSchema = Schema({
  name: {
    type: String,
    default: "Anonyme",
  },
  text: {
    type: String,
    required: true,
  },
})

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
  },
  comments: [CommentSchema],
})

module.exports = model("Post", PostSchema, "Posts")
