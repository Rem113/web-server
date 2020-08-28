const io = require("socket.io")

module.exports = (http) => {
  const socket = io(http)

  socket.on("connection", (client) => {
    client.on("start", (user) => {
      client.broadcast.emit("info", { user, info: " has joined!" })

      client.on("message", (message) => {
        socket.sockets.emit("message", { user, message })
      })
    })
  })
}
