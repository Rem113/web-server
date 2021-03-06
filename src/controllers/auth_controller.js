const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { getFromAddress } = require("../services/address_converter")

const User = require("../models/user")

const validateRegisterInput = ({ email, password, name, age, address }) => {
  const errors = {}

  if (email === undefined || email === "")
    errors.email = "Email cannot be empty"

  if (password === undefined || password === "")
    errors.password = "Password cannot be empty"

  if (name === undefined || name === "") errors.name = "Name cannot be empty"

  if (age === undefined || age < 0) errors.age = "Age cannot be empty"

  if (address === undefined || address === "")
    errors.address = "Address cannot be empty"

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

    const labeledAddress = await getFromAddress(req.body.address)

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

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
      address: {
        lat: labeledAddress.coordinates[0],
        lon: labeledAddress.coordinates[1],
        address: labeledAddress.address,
      },
    })

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
      .json({ token, id: user.id, name: user.name, manager: user.manager })
  },

  PromoteToManager: async (req, res) => {
    const user = req.user

    if (user.manager === true) return res.status(200).end()

    user.manager = true

    await user.save()

    return res.status(200).end("OK !")
  },
}
