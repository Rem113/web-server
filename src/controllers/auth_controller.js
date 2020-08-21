const User = require("../models/user")

const validate = ({ email, password, name, age }) => {
  if (email === undefined || email === "") return "Email cannot be empty"

  if (password === undefined || password === "")
    return "Password cannot be empty"

  if (name === undefined || name === "") return "Name cannot be empty"

  if (age === undefined || age < 0) return "Age cannot be empty"

  return null
}

module.exports = {
  RegisterController: async (req, res) => {

    let [connected, error, user] = [false, validate(req.body), null];

    var response = {
      connected: connected,
      error: error,
      user: [user]
    };

    if (error !== null)
      return res.json(response).end()

    User.create(req.body, (err, usr) => {
      if (err) {
        response.error = "An account with the same email already exists";
        return res.json(response).end()
      }
      else {
        response.connected = true;
        response.user = [usr]
        return res.json(response).end()
      }
    })
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
