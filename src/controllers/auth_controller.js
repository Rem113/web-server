const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/user")

const validateRegisterInput = ({ email, password, name, age }) => {
  const errors = {}

  if (email === undefined || email === "")
    errors.email = "Email cannot be empty"

  if (password === undefined || password === "")
    errors.password = "Password cannot be empty"

  if (name === undefined || name === "") errors.name = "Name cannot be empty"

  if (age === undefined || age < 0) errors.age = "Age cannot be empty"

  return Object.keys(errors).length > 0 ? errors : null
}

const validateLoginInput = ({ email, password }) => {
  const errors = {}

  if (email === undefined || email === "")
    errors.email = "Email cannot be empty"

  if (password === undefined || password === "")
    errors.password = "Password cannot be empty"

  return Object.keys(errors).length > 0 ? errors : null
}

module.exports = {
  RegisterController: async (req, res) => {
    // Validate input
    const errors = validateRegisterInput(req.body)

    if (errors !== null) return res.status(400).json(errors)

    // Check if the email is available
    const existingUser = await User.findOne({ email: req.body.email })

    if (existingUser !== null)
      return res
        .status(409)
        .json({ email: "An account with this email already exists" })

    // Hash password, then create user
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = await User.create({ ...req.body, password: hashedPassword })

    return res.status(201).json({ id: user.id })
  },

  LoginController: async (req, res) => {
    // Validate input
    const errors = validateLoginInput(req.body)

    if (errors !== null) return res.status(400).json(errors)

    // Checks that the user exist
    const user = await User.findOne({ email: req.body.email })

    if (user === null)
      return res
        .status(404)
        .json({ email: "There is no account associated with this email" })

    // Compare password hash
    const passwordMatch = await bcrypt.compare(req.body.password, user.password)

    if (!passwordMatch)
      return res.status(400).json({ password: "The password is invalid" })

    // Create JWT, then return it
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: 3600 * 24,
    })

    return res
      .status(200)
      .json({ token, name: user.name, isManager: user.isManager })
  },

  PromoteToManager: async (req, res) => {
    const user = req.user

    if (user.isManager === true) return res.status(200).end()

    user.isManager = true

    await User.save(user)

    return res.status(200).end()
  },

  GetDelivers: async (req, res) => {
    await User.find({ isManager: "false" }, ['name', 'age', 'email'], (err, users) => {
      if (err)
        return res.status(404)
      else
        return res.status(200).json(users)
    })
  }
}
