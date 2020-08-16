const bodyParser = require("body-parser")

module.exports = (app) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use("/api/auth", require("../routes/auth"))
  app.use("/api/delivery", require("../routes/delivery"))
}