const io = require("socket.io")

module.exports = (http) => {
    const socket = io(http)

    var messages = []

    socket.on("connection", (client) => {
        console.log("💬 New user joined!")
        client.on("start", (user) => {
            client.broadcast.emit("info", { user, info: " has joined!" })
            client.emit("back-up", messages)

            client.on("message", (message) => {
                messages.push({ user, message })
                socket.sockets.emit("message", { user, message })
            })

            client.on("delete-backup", () => messages = [])
        })

        client.on('disconnect', () => {
            console.log('User disconnected');
        });
    })
}
