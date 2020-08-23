const Post = require("../models/post")

const validateRegisterInput = ({ title, content }) => {
  const errors = {}

  if (title === undefined || title === "")
    errors.title = "Title cannot be empty"

  if (content === undefined || content === "")
    errors.content = "Password cannot be empty"

  return Object.keys(errors).length > 0 ? errors : null
}

module.exports = {
  PostPost: async (req, res) => {
    const errors = validateRegisterInput(req.body)

    if (errors !== null) return res.status(400).json(errors)

    await Post.create(req.body)

    return res.status(201).end()
  },

  GetPosts: async (req, res) => {
    const page = req.body.page - 1 || 0

    const posts = await Post.find()
      .sort({ postedAt: -1 })
      .skip(page * 10)
      .limit(10)

    return res.status(200).json(posts)
  },
}