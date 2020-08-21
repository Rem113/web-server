const bcrypt = require("bcryptjs")

const User = require("../models/user")
const bcryptjs = require("bcryptjs")

const validate = ({ email, password, name }) => {
  const errors = {}

  if (email === undefined || email === "")
    errors.email = "Email cannot be empty"

  if (password === undefined || password === "")
    errors.password = "Password cannot be empty"

  if (name === undefined || name === "") errors.name = "Name cannot be empty"

  return Object.keys(errors).length > 0 ? errors : null
}

module.exports = {
  RegisterController: async (req, res) => {
    const errors = validate(req.body)

    if (errors !== null) return res.status(400).json(errors)

    const existingUser = await User.findOne({ email: req.body.email })

    if (existingUser !== null)
      return res
        .status(409)
        .json({ email: "An account with this email already exists" })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = await User.create({ ...req.body, password: hashedPassword })

    return res.status(201).json({ id: user.id })
  },

  LoginController: async (req, res) => {
    const user = await User.findOne({ email: req.body.email })

    if (user === null)
      return res
        .status(404)
        .json({ email: "There is no account associated with this email" })

    const passwordMatch = await bcrypt.compare(req.body.password, user.password)

    if (!passwordMatch)
      return res.status(400).json({ password: "The password is invalid" })

    return res.status(200).json({ id: user.id })
  },
}
