const jwt = require("jsonwebtoken")

const User = require("../models/user")

module.exports = async (req, res, next) => {
  const { authorization } = req.headers

  if (authorization === undefined || !authorization.startsWith("Bearer "))
    return res.status(401).end()

  const token = authorization.substring("Bearer ".length)

  let payload

  try {
    payload = jwt.verify(token, process.env.TOKEN_SECRET)
  } catch (err) {
    if (err.name === "TokenExpiredError")
      return res.status(403).end("Token expired")
    else if (err.name === "JsonWebTokenError")
      return res.status(401).end("Invalid signature")
    else throw err
  }

  const user = await User.findById(payload.id)

  if (user === null) return res.status(401).end("Unknown user")
  req.user = user
  next()
}
