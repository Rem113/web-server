const User = require("../models/user")

const validate = ({ email, password, name }) => {
  if (email === undefined || email === "") return "Email cannot be empty"

  if (password === undefined || password === "")
    return "Password cannot be empty"

  if (name === undefined || name === "") return "Name cannot be empty"

  return null
}

module.exports = {
  RegisterController: async (req, res) => {
    let [connected, error, user] = [false, validate(req.body), null];

    if (error !== null) {
      return res.json({
        connected: connected,
        error: error,
        user: [user]
      }).end()
    }

    await User.create(req.body, (err, usr) => {
      if (err)
        error = err;
      else {
        user = usr
        connected = true
      }
    })

    res.json({
      connected: connected,
      error: error,
      user: [user]
    }).end()
  },

  LoginController: async (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email }, (err, user) => {

      let [connected, error] = [false, null];

      if (err) {
        console.log(err)
        error = err
      }
      else if (user === null) {
        error = email + ' account doesn\'t exists'
      } else if (user.password !== password) {
        error = 'Incorrect Password'
      } else {
        connected = true
      }

      res.json({
        connected: connected,
        error: error,
        user: [user]
      }).end()
    })
  },
}
