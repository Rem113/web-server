const User = require("../models/user")

module.exports = {
  RegisterController: async (req, res) => {
    const { email, password, name, isManager } = req.body

    // TODO: Validate

    await User.create(req.body)

    return res.status(201).end()
  },
}
