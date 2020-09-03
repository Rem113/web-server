const io = require("socket.io")

module.exports = (http) => {
  const socket = io(http)

  var messages = []

  socket.on("connection", (client) => {
    client.on("start", ({ user, manager }) => {
      client.broadcast.emit("info", {
        date: new Date(),
        user,
        manager,
        info: " has joined",
      })
      client.emit("back-up", messages)

      client.on("message", (message) => {
        const newMessage = { date: new Date(), user, manager, message }
        messages.push(newMessage)
        socket.sockets.emit("message", newMessage)
      })

      client.on("disconnect", () =>
        client.broadcast.emit("info", {
          date: new Date(),
          user,
          manager,
          info: " has left",
        })
      )
    })
  })
}
