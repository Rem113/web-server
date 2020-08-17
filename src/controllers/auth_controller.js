const User = require("../models/user")

const validate = ({ email, password, name, isManager }) => {
  if (email === undefined || email === "") return "Email cannot be empty"

  if (password === undefined || password === "")
    return "Password cannot be empty"

  if (name === undefined || name === "") return "Name cannot be empty"

  return null
}

module.exports = {
  RegisterController: async (req, res) => {
    const maybeError = validate(req.body)

    if (maybeError) return res.status(400).end(maybeError)

    try {
      await User.create(req.body)
    } catch (error) {
      return res.status(500).end(error)
    }

    return res.status(201).end(name + " has been added successfully")
  },
}
