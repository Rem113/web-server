const User = require("../models/user")
const { json } = require("body-parser")

module.exports = {
  RegisterController: async (req, res) => {
    const { email, password, name, isManager } = req.body

    if (email === undefined || email === "")
      return res.status(400).end("Email cannot be empty")

    if (password === undefined || password === "")
      return res.status(400).end("Password cannot be empty")

    if (name === undefined || name === "")
      return res.status(400).end("Name cannot be empty")

    if (isManager === undefined)
      return res.status(400).end("isManager cannot be null")

    try {
      await User.create(req.body)
    } catch (error) {
      return res.status(400).end(error)
    }

    return res.status(201).end(name + " has been added successfully")
  },

  LoginController: async (req, res) => {
    const { email, password } = req.body

    console.log(email)

    User.find({ email: email }, (err, user) => {

      const userPassword = user[0].password

      if (err)
        console.log(err)
      else if (userPassword === password)
        console.log(email + ' is logged');
      else
        console.log("Don't makir oto")

      res.json({
        "connected": true
      }).end();
    })

  }
}
