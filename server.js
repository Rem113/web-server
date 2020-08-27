require("dotenv").config()
const express = require("express")
const PORT = process.env.API_PORT
const expressLoader = require("./src/loaders/express")
const mongoLoader = require("./src/loaders/mongoose")
const socketio = require('./src/loaders/socketio')

const main = async () => {
  const app = express()
  app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`))
  await expressLoader(app)
  await mongoLoader()
  await socketio(app)
}

main()
