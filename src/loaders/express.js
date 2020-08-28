const bodyParser = require("body-parser")
const cors = require("cors")

module.exports = (app) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cors({ origin: "http://localhost:1234", credentials: true }))

  app.use("/api/auth", require("../routes/auth"))
  app.use("/api/delivery", require("../routes/delivery"))
  app.use("/api/post", require("../routes/post"))
}
