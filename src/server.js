require("dotenv").config()
const express = require("express")
const PORT = process.env.API_PORT
const socketioLoader = require("./loaders/socketio")
const expressLoader = require("./loaders/express")
const mongoLoader = require("./loaders/mongoose")

const main = async () => {
  const app = express()
  const http = require("http").createServer(app)
  socketioLoader(http)
  expressLoader(app)
  await mongoLoader()
  http.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`))
}

main()
