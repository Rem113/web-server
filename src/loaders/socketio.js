const io = require("socket.io")

module.exports = (http) => {
  const socket = io(http)

  var messages = []

  socket.on("connection", (client) => {
    client.on("start", ({ user, isManager }) => {
      console.log(`💬 ${user} has joined!`)
      client.broadcast.emit("info", {
        date: new Date(),
        user,
        isManager,
        info: " has joined",
      })
      client.emit("back-up", messages)

      client.on("message", (message) => {
        const newMessage = { date: new Date(), user, isManager, message }
        messages.push(newMessage)
        socket.sockets.emit("message", newMessage)
      })

      client.on("disconnect", () =>
        client.broadcast.emit("info", {
          date: new Date(),
          user,
          isManager,
          info: " has left",
        })
      )
    })
  })
}
